import * as userWorkspaceRepository from "@/lib/api/user-workspace";
import {Pagination, Role, UserWorkspaceDto, WorkspaceRole} from "@/types";
import {BSON, ObjectId} from "mongodb";
import {clerkClient} from "@clerk/nextjs/server";


export async function addUserToWorkspace(
    tenantId: string,
    userId: string,
    role: Role,
    userWorkspaceDto: UserWorkspaceDto
): Promise<UserWorkspaceDto> {
    const workspaceObjectId = new BSON.ObjectId(userWorkspaceDto.workspaceId);
    await ensureUserCanEditWorkspace(tenantId, workspaceObjectId, userId, role);
    let clerkUserId = userWorkspaceDto.userId;
    const email = userWorkspaceDto.email;

    if (!clerkUserId && email && email !== "") {
        const users = await clerkClient.users.getUserList({emailAddress: [email]});
        if (users.data.length > 0) {
            clerkUserId = users.data[0].id;
        }
    }

    await userWorkspaceRepository.addUserToWorkspace(
        workspaceObjectId,
        tenantId,
        clerkUserId,
        email,
        userWorkspaceDto.workspaceRole
    );

    return toWorkspaceUserDto(
        tenantId,
        clerkUserId,
        userWorkspaceDto.email,
        userWorkspaceDto.workspaceId,
        userWorkspaceDto.workspaceRole
    );
}

export async function inviteMemberToWorkspace(
    tenantId: string,
    userId: string,
    role: Role,
    workspaceUser: UserWorkspaceDto
): Promise<UserWorkspaceDto> {
    const workspaceObjectId = new BSON.ObjectId(workspaceUser.workspaceId);
    await ensureUserCanEditWorkspace(tenantId, workspaceObjectId, userId, role);

    // Create invitation using Clerk's API
    const invitation = await clerkClient.invitations.createInvitation({
        emailAddress: workspaceUser.email,
        publicMetadata: {
            tenantId: workspaceUser.tenantId,
            roles: [Role.MEMBER.toLowerCase()],
        },
    });

    // Add user to workspace in the repository
    await userWorkspaceRepository.addUserToWorkspace(
        workspaceObjectId,
        tenantId,
        null,
        workspaceUser.email,
        workspaceUser.workspaceRole
    );

    return workspaceUser;
}

export async function addAdminToWorkspace(
    workspaceId: ObjectId,
    tenantId: string,
    userId: string
) {
    const user = await clerkClient.users.getUser(userId);
    const email = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

    if (!email) {
        throw new Error("Can't add admin without email to workspace");
    }

    await userWorkspaceRepository.addUserToWorkspace(
        workspaceId,
        tenantId,
        userId,
        email,
        WorkspaceRole.ADMIN
    );
}

export async function getAllWorkspaceUsers(
    tenantId: string,
    workspaceId: string,
    userId: string,
    role: Role,
    pagination: Pagination
): Promise<UserWorkspaceDto[]> {
    const workspaceObjectId = new BSON.ObjectId(workspaceId);
    await ensureUserCanEditWorkspace(tenantId, workspaceObjectId, userId, role);
    const workspaceUsers = await userWorkspaceRepository.getWorkspaceUsers(
        tenantId,
        workspaceObjectId,
        pagination
    );
    const userWorkspacesResultList = [];
    for (const userWorkspace of workspaceUsers) {
        userWorkspacesResultList.push(
            await toWorkspaceUserDto(
                tenantId,
                userWorkspace.userId,
                userWorkspace.email,
                userWorkspace.workspaceId.toString(),
                userWorkspace.role
            )
        );
    }
    return userWorkspacesResultList;
}

export async function getWorkspaceUserExists(
    workspaceId: string,
    email: string
): Promise<boolean> {
    const workspaceObjectId = new BSON.ObjectId(workspaceId);
    const userWorkspace =
        await userWorkspaceRepository.getUserWorkspaceByWorkspaceAndEmail(
            workspaceObjectId,
            email
        );
    return !!userWorkspace;
}

export async function changeWorkspaceUserRole(
    tenantId: string,
    userId: string,
    role: Role,
    userWorkspaceDto: UserWorkspaceDto
): Promise<UserWorkspaceDto> {
    const workspaceObjectId = new BSON.ObjectId(userWorkspaceDto.workspaceId);
    await ensureUserCanEditWorkspace(tenantId, workspaceObjectId, userId, role);
    const userWorkspaceToChange =
        await userWorkspaceRepository.getUserWorkspaceByTenantAndWorkspaceAndEmail(
            tenantId,
            workspaceObjectId,
            userWorkspaceDto.email
        );
    await userWorkspaceRepository.updateUserWorkspaceRole(userWorkspaceToChange._id, userWorkspaceDto.workspaceRole);
    return toWorkspaceUserDto(
        tenantId,
        userWorkspaceDto.userId,
        userWorkspaceDto.email,
        userWorkspaceDto.workspaceId,
        userWorkspaceDto.workspaceRole
    );
}

export async function removeUserFromWorkspace(
    tenantId: string,
    workspaceId: string,
    userId: string,
    role: Role,
    email: string
): Promise<void> {
    const workspaceObjectId = new BSON.ObjectId(workspaceId);
    await ensureUserCanEditWorkspace(tenantId, workspaceObjectId, userId, role);
    const userWorkspaceToBeRemoved =
        await userWorkspaceRepository.getUserWorkspaceByTenantAndWorkspaceAndEmail(
            tenantId,
            workspaceObjectId,
            email
        );
    if (
        role === Role.OWNER ||
        userWorkspaceToBeRemoved.role === WorkspaceRole.CREATOR
    ) {
        return userWorkspaceRepository.removeUserFromWorkspace(
            tenantId,
            workspaceObjectId,
            email
        );
    } else {
        throw new Error("User can not be deleted");
    }
}

export async function addUserIdToUserWorkspaces(
    tenantId: string,
    clerkUserId: string
) {
    const user = await clerkClient.users.getUser(clerkUserId);
    const email = user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress;

    if (!email) {
        throw new Error("Can't add admin without email to workspace");
    }

    const couldBeUpdated =
        await userWorkspaceRepository.getUserWorkspacesWithoutUserIdByEmail(
            tenantId,
            email
        );
    if (couldBeUpdated) {
        await userWorkspaceRepository.addUserIdToUserWorkspaces(
            tenantId,
            clerkUserId,
            email
        );
    }
}

export async function ensureUserCanEditWorkspace(
    tenantId: string,
    workspaceId: ObjectId,
    userId: string,
    role: Role
) {
    const userWorkspace =
        await userWorkspaceRepository.getUserWorkspaceByTenantAndWorkspaceAndUserId(
            tenantId,
            workspaceId,
            userId
        );
    if (
        (role !== Role.OWNER && !userWorkspace) ||
        (userWorkspace && userWorkspace.role !== WorkspaceRole.ADMIN)
    ) {
        throw new Error("User doesn't have permission for the workspace settings");
    }
}

export async function toWorkspaceUserDto(
    tenantId: string,
    userId: string | null,
    email: string,
    workspaceId: string,
    workspaceRole: WorkspaceRole
): Promise<UserWorkspaceDto> {
    let userWorkspaceDto: UserWorkspaceDto = {
        tenantId,
        userId,
        workspaceId,
        workspaceRole,
        email,
        firstName: "",
        lastName: "",
    };

    if (!userId) {
        const users = await clerkClient.users.getUserList({emailAddress: [email]});
        const user = users.data[0];
        userWorkspaceDto.userId = user?.id || null;
        userWorkspaceDto.firstName = user?.firstName || "";
        userWorkspaceDto.lastName = user?.lastName || "";
    }

    if (userId && (!userWorkspaceDto.firstName || !userWorkspaceDto.lastName)) {
        const user = await clerkClient.users.getUser(userId);
        userWorkspaceDto.firstName = user.firstName || "";
        userWorkspaceDto.lastName = user.lastName || "";
    }

    return userWorkspaceDto;
}

export async function getMemberOptions(
    clerkUserId: string,
    tenantId: string,
    workspaceId: string
) {
    const role = Role.MEMBER.toLowerCase();
    const workspaceObjectId = new BSON.ObjectId(workspaceId);

    // Fetch pending invitations for the role
    const pendingInvites = await clerkClient.invitations.getInvitationList({status: "pending"});

    // Fetch users by role within the tenant
    const users = await clerkClient.users.getUserList();
    const usersByRole = users.data.filter(user => user.publicMetadata.organizationRole === role)


    // Fetch workspace users' emails
    const workspaceUsersEmails = await userWorkspaceRepository.getWorkspaceUsersEmails(
        tenantId,
        workspaceObjectId
    );

    // Combine pending invites and existing users
    const combinedUsers = [
        ...pendingInvites.data.map((invite: any) => ({
            email: invite.emailAddress,
            type: 'invite'
        })),
        ...usersByRole.map(user => ({
            email: user.emailAddresses.find(e => e.id === user.primaryEmailAddressId)?.emailAddress,
            type: 'user'
        }))
    ];

    // Filter out users already added to the workspace
    const allowed = combinedUsers.filter(
        (option) => option.email && !workspaceUsersEmails.includes(option.email)
    );

    return {
        allowed,
        added: workspaceUsersEmails,
    };
}
