import {
    CreateDigramResponse,
    DiagramResponse,
    EditNodesRequest,
    EditNodesResponse,
    ExplainNodeRequest,
    ExplainNodeResponse,
    SaveDiagramRequest,
    SummaryResponse,
} from "@/types"
import { instance } from "@/utils/axios"

enum EditDiagramEndpoint {
    CREATE = "/create/diagram",
    GET_BY_ID = "/diagram",
    EXPLAIN_NODES = "/take-note",
    EDIT_NODES = "/update-prompt",
    SUMMARY = "/summary",
    SAVE = "/update/diagram",
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

export const explainNodes = ({
    id,
    request,
}: {
    id: number
    request: ExplainNodeRequest
}) => {
    return instance.post<ExplainNodeResponse>(
        `${EditDiagramEndpoint.EXPLAIN_NODES}/${id}`,
        {
            ...request,
            input: "",
        }
    )
}

export const editNodes = ({
    id,
    request,
}: {
    id: number
    request: EditNodesRequest
}) => {
    return instance.put<EditNodesResponse>(
        `${EditDiagramEndpoint.EDIT_NODES}/${id}`,
        request
    )
}

export const summary = (id: number) => {
    return instance.put<SummaryResponse>(`${EditDiagramEndpoint.SUMMARY}/${id}`)
}

export const saveMindmap = ({
    id,
    request,
}: {
    id: number
    request: SaveDiagramRequest
}) => {
    return instance.put(`${EditDiagramEndpoint.SAVE}/${id}`, request)
}
