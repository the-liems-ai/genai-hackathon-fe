import {
    CreateDigramResponse,
    DiagramResponse,
    UpdateDigramRequest,
} from "@/types"
import { instance } from "@/utils/axios"

enum EditDiagramEndpoint {
    CREATE = "/create/diagram",
    GET_BY_ID = "/diagram",
    UPDATE = "/update/diagram",
}

export const createMindmap = (prompt: string) => {
    return instance.post<CreateDigramResponse>(
        EditDiagramEndpoint.CREATE,
        prompt
    )
}

export const getMindmapById = (id: number) => {
    return instance.get<DiagramResponse>(
        `${EditDiagramEndpoint.GET_BY_ID}/${id}`
    )
}

export const updateMindmap = ({
    id,
    request,
}: {
    id: number
    request: UpdateDigramRequest
}) => {
    return instance.put<CreateDigramResponse>(
        `${EditDiagramEndpoint.UPDATE}/${id}`,
        request
    )
}
