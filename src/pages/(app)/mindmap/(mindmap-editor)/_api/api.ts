import { CreateDigramResponse, DiagramResponse } from "@/types"
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

export const getMindmapById = (id: string) => {
    return instance.get<DiagramResponse>(
        `${EditDiagramEndpoint.GET_BY_ID}/${id}`
    )
}

// export const updateMindmap = (id: string, ) => {
