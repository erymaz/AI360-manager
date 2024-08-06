import * as organisationRepository from "@/lib/api/organisation";
import {DELETED_PREFIX, Organisation} from "@/lib/api/organisation";
import {
    Industry,
    OrganisationDetailsFormDto,
    RegistrationFormData,
} from "@/lib/models/organisation-details.model";
import {User} from "@clerk/backend";

import {clerkClient} from '@clerk/clerk-sdk-node';

// Create Organisation
export async function createOrganisation(
    user: User,
    configObj: RegistrationFormData
): Promise<void> {
    await organisationRepository.createOrganisation(user, configObj);
}

// Update Organisation Details
export async function updateOrganisationDetails(
    formData: OrganisationDetailsFormDto
) {
    await organisationRepository.updateOrganisationDetails(formData.tenantId, {
        companyName: formData.companyName,
        companyWebsite: formData.companyWebsite,
        country: formData.country,
        billingInfo: {
            billingAddress: {
                addressLine1: formData.addressLine1,
                addressLine2: formData.addressLine2 || undefined,
                city: formData.city,
                state: formData.state,
                postalCode: formData.postalCode,
            },
            taxId: formData.taxId || undefined,
        },
        industry: formData.industry,
    });

    await clerkClient.organizations.updateOrganization(formData.tenantId, {
        name: formData.companyName,
    });


    if (formData.id && formData.firstName && formData.lastName) {

        const user = await clerkClient.users.getUser(formData.id);

        // Update user's public metadata
        await clerkClient.users.updateUserMetadata(formData.id, {
            publicMetadata: {
                ...user.publicMetadata,
                organizationName: formData.companyName,
            },
        });

        await clerkClient.users.updateUser(formData.id, {
            firstName: formData.firstName,
            lastName: formData.lastName,
        });
    }
}

// Find Organisation
export async function findOrganisation(
    tenantId: string
): Promise<Organisation> {
    const org = await organisationRepository.findOrganisation(tenantId);
    if (!org) {
        throw new Error("organisation does not exist");
    }
    return org;
}

// Find Organisation Details
export async function findOrganisationDetails(
    tenantId: string,
    userId: string
): Promise<OrganisationDetailsFormDto> {
    const org = await organisationRepository.findOrganisationDetails(tenantId);
    if (!org) {
        throw new Error("organisation does not exist");
    }

    const userData = await clerkClient.users.getUser(userId);
    const id = userData.id;
    const firstName = userData.firstName ?? null;
    const lastName = userData.lastName ?? null;

    return {
        id,
        firstName,
        lastName,
        addressLine1: org.billingInfo?.billingAddress.addressLine1 ?? "",
        addressLine2: org.billingInfo?.billingAddress.addressLine2 ?? null,
        city: org.billingInfo?.billingAddress.city ?? "",
        companyName: org.companyName,
        companyWebsite: org.companyWebsite || "",
        country: org.country ?? "",
        email: org.email,
        industry: org.industry || Industry.other,
        postalCode: org.billingInfo?.billingAddress.postalCode ?? "",
        state: org.billingInfo?.billingAddress.state ?? "",
        taxId: org.billingInfo?.taxId ?? null,
        tenantId: org.tenantId,
    };
}

// Get Organisation Onboarding Step Index
export async function getOrganisationOnboardingStepIndex(
    tenantId: string
): Promise<number> {
    return organisationRepository.isOrganisationSetup(tenantId);
}

// Check if Organisation Exists
export async function doesOrganisationExist(
    organisationId: string
): Promise<boolean> {
    return organisationRepository.doesOrganisationExist(organisationId);
}

// Delete Organisation
export async function deleteOrganisation(tenantId: string): Promise<void> {
    await organisationRepository.markOrganisationDeleted(tenantId);
    await clerkClient.organizations.updateOrganization(tenantId, {
        name: DELETED_PREFIX + tenantId,
    });

    // const users = await clerkClient.users.getUserList({
    //     organizationId: tenantId,
    // });
    //
    // for (const user of users) {
    //     await clerkClient.users.deleteUser(user.id);
    // }

    // await organisationRepository.writeOrganisationDeletionResult(tenantId, {
    //     success: true,
    // });
}
