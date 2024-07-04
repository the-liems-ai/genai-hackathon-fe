import { CreateOrgResponse } from "@/types"
import { authInstance } from "@/utils/axios"

enum OrganizationAPI {
    CREATE = "/org",
}

export const createOrg = async (name: string) => {
    const { data } = await authInstance.post<CreateOrgResponse>(
        OrganizationAPI.CREATE,
        { name }
    )

    return data
}
