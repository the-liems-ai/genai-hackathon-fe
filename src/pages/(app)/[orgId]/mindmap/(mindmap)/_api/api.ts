import { getAuth } from "@/stores/auth-store"
import { getCurrentOrg } from "@/stores/org-store"
import { DiagramsResponse } from "@/types"
import { instance } from "@/utils/axios"

export interface GetDiagramsRequestParams {
    keyword: string
    page: number
    limit: number
    orgId: string
}

enum DiagramEndpoint {
    GET = "/diagrams",
    DELETE = "/delete/diagram",
}

export const getDiagrams = ({
    keyword,
    page,
    limit,
    orgId,
}: GetDiagramsRequestParams) => {
    return instance.get<DiagramsResponse>(DiagramEndpoint.GET, {
        params: {
            keyword,
            page,
            limit,
            org_id: orgId,
        },
        headers: {
            Authorization: `Bearer ${getAuth().token}`,
        },
    })
}

export const deleteDiagram = (id: number) => {
    return instance.delete(`${DiagramEndpoint.DELETE}/${id}`, {
        headers: {
            Authorization: `Bearer ${getAuth().token}`,
        },
    })
}
