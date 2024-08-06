import * as userWorkspaceRepository from "@/lib/api/user-workspace";
import * as workspaceRepository from "@/lib/api/workspace";
import { Workspace } from "@/lib/api/workspace";
import * as userWorkspaceService from "@/lib/services/user-workspace";
import {
  Role,
  WorkspaceDto,
  WorkspaceGeneratorsDto,
  WorkspaceRole,
} from "@/types";
import { BSON, ObjectId } from "mongodb";

export async function createWorkspace(
  tenantId: string,
  workspace: any,
  userId: string,
  role: Role
): Promise<WorkspaceDto> {
  const newWorkspace = await workspaceRepository.createWorkspace(workspace);
  if (role !== Role.OWNER) {
    await userWorkspaceService.addAdminToWorkspace(
      newWorkspace.insertedId,
      workspace.tenantId,
      userId
    );
  }
  return {
    logoUrl: workspace.logoUrl ?? "",
    template: workspace.template ?? { color: "", name: "" },
    id: newWorkspace.insertedId.toString(),
    tenantId: workspace.tenantId,
    generators: workspace.generators,
    workspaceName: workspace.workspaceName,
    currentUserRole: WorkspaceRole.ADMIN,
  };
}

export async function getWorkspaceByTenantAndId(
  tenantId: string,
  workspaceId: string,
  userId: string,
  role: Role
): Promise<WorkspaceDto | null> {
  const workspace = await workspaceRepository.getWorkspaceByTenantAndId(
    tenantId,
    workspaceId
  );
  const workspaceDto = {
    logoUrl: workspace.logoUrl ?? "",
    template: workspace.template ?? { color: "", name: "" },
    id: workspace._id.toString(),
    tenantId: workspace.tenantId,
    generators: workspace.generators,
    workspaceName: workspace.workspaceName,
    currentUserRole: WorkspaceRole.ADMIN,
  };
  if (role === Role.OWNER) {
    return workspaceDto;
  }
  const userWorkspace =
    await userWorkspaceRepository.getUserWorkspaceByTenantAndWorkspaceAndUserId(
      tenantId,
      workspace._id,
      userId
    );
  if (!userWorkspace) {
    return null;
  }
  return { ...workspaceDto, currentUserRole: userWorkspace.role };
}

export async function getWorkspaceByTenantAndName(
  tenantId: string,
  workspaceName: string
): Promise<WorkspaceDto | null> {
  const workspace = await workspaceRepository.getWorkspaceByTenantAndName(
    tenantId,
    workspaceName
  );
  if (!workspace) {
    return null;
  }
  return {
    logoUrl: workspace.logoUrl ?? "",
    template: workspace.template ?? { color: "", name: "" },
    id: workspace._id.toString(),
    tenantId: workspace.tenantId,
    generators: workspace.generators,
    workspaceName: workspace.workspaceName,
    currentUserRole: WorkspaceRole.ADMIN,
  };
}

export async function getAllWorkspaces(
  tenantId: string,
  userId: string,
  role: Role
): Promise<WorkspaceDto[]> {
  let allWorkspaces;
  if (role === Role.OWNER) {
    allWorkspaces = await workspaceRepository.getAllWorkspaces(tenantId);
    return allWorkspaces.map((workspace: Workspace) => {
      return {
        logoUrl: workspace.logoUrl ?? "",
        template: workspace.template ?? { color: "", name: "" },
        id: workspace._id.toString(),
        tenantId: workspace.tenantId,
        generators: workspace.generators,
        workspaceName: workspace.workspaceName,
        currentUserRole: WorkspaceRole.ADMIN,
      };
    });
  }
  const userWorkspaces = await userWorkspaceRepository.getWorkspacesForUser(
    tenantId,
    userId
  );
  return Promise.all(
    userWorkspaces.map(async (userWorkspace) => {
      const workspace = await workspaceRepository.getWorkspaceByTenantAndId(
        tenantId,
        userWorkspace.workspaceId.toString()
      );
      return {
        logoUrl: workspace.logoUrl ?? "",
        template: workspace.template ?? { color: "", name: "" },
        id: workspace._id.toString(),
        tenantId: workspace.tenantId,
        generators: workspace.generators,
        workspaceName: workspace.workspaceName,
        currentUserRole: userWorkspace.role,
      };
    })
  );
}

export async function getWorkspaceGenerators(
  tenantId: string,
  workspaceId: string,
  userId: string,
  role: Role
): Promise<WorkspaceGeneratorsDto> {
  const workspaceObjectId = new BSON.ObjectId(workspaceId);
  const workspaceGenerators = await workspaceRepository.getWorkspaceGenerators(
    tenantId,
    workspaceObjectId
  );
  if (role === Role.OWNER) {
    return workspaceGenerators;
  }
  const userWorkspace =
    await userWorkspaceRepository.getUserWorkspaceByTenantAndWorkspaceAndUserId(
      tenantId,
      workspaceObjectId,
      userId
    );
  if (!userWorkspace) {
    return { generators: [] };
  }
  return workspaceGenerators;
}

export async function updateWorkspace(
  workspace: WorkspaceDto,
  userId: string,
  role: Role
): Promise<void> {
  await ensureUserCanEditWorkspace(
    workspace.tenantId,
    new BSON.ObjectId(workspace.id),
    userId,
    role
  );
  return workspaceRepository.updateWorkspace(workspace);
}

export async function deleteWorkspace(
  tenantId: string,
  userId: string,
  role: Role,
  workspaceId: string
): Promise<void> {
  const workspace = await workspaceRepository.getWorkspaceByTenantAndId(
    tenantId,
    workspaceId
  );
  if (!workspace) {
    throw new Error("Workspace not found");
  }
  await ensureUserCanEditWorkspace(tenantId, workspace._id, userId, role);
  return markWorkspaceDeleted(workspace);
}

export async function deleteWorkspaces(tenantId: string): Promise<void> {
  await userWorkspaceRepository.removeUsers(tenantId);
  await workspaceRepository.markDeletedByTenantId(tenantId);
}

async function markWorkspaceDeleted(workspace: Workspace): Promise<void> {
  await userWorkspaceRepository.removeUsersFromWorkspace(
    workspace.tenantId,
    workspace._id
  );
  await workspaceRepository.markDeleted(workspace._id);
}

async function ensureUserCanEditWorkspace(
  tenantId: string,
  workspaceId: ObjectId,
  userId: string,
  role: Role
) {
  if (role === Role.OWNER) {
    return;
  }
  const userWorkspace =
    await userWorkspaceRepository.getUserWorkspaceByTenantAndWorkspaceAndUserId(
      tenantId,
      workspaceId,
      userId
    );
  if (!userWorkspace || userWorkspace.role !== WorkspaceRole.ADMIN) {
    throw new Error(
      "User doesn't have required permissions to update this workspace"
    );
  }
}
