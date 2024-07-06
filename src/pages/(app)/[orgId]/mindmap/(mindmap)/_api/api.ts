import { getAuth } from "@/stores/auth-store"
import { DiagramsResponse } from "@/types"
import { instance } from "@/utils/axios"

export interface GetDiagramsRequestParams {
    keyword: string
    page: number
    limit: number
}

enum DiagramEndpoint {
    GET = "/diagrams",
    DELETE = "/delete/diagram",
}

export const getDiagrams = ({
    keyword,
    page,
    limit,
}: GetDiagramsRequestParams) => {
    return instance.get<DiagramsResponse>(DiagramEndpoint.GET, {
        params: {
            keyword,
            page,
            limit,
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
