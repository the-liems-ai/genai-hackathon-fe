import {
    CreateDigramResponse,
    DiagramResponse,
    EditNodesRequest,
    EditNodesResponse,
    ExplainNodeRequest,
    ExplainNodeResponse,
    GenQuizRequest,
    GenQuizResponse,
    SaveDiagramRequest,
    SummaryResponse,
} from "@/types"
import { aiInstance, instance } from "@/utils/axios"

enum EditDiagramEndpoint {
    CREATE = "/create/diagram",
    GET_BY_ID = "/diagram",
    EXPLAIN_NODES = "/take-note",
    EDIT_NODES = "/update-prompt",
    SUMMARY = "/summary",
    SAVE = "/update/diagram",
    GEN_QUIZ = "/create/quiz",
}

enum AIEndpoint {
    UPLOAD_FILE = "/rag/upload/requirement",
    UPLOAD_URL = "/rag/url-upload/requirement",
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

export const genQuiz = ({ request }: { request: GenQuizRequest }) => {
    return instance.post<GenQuizResponse>(EditDiagramEndpoint.GEN_QUIZ, request)
}

export const uploadFile = (file: File) => {
    return aiInstance.post(AIEndpoint.UPLOAD_FILE, file, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

export const uploadURL = (url: string) => {
    return aiInstance.post(
        AIEndpoint.UPLOAD_URL,
        { url },
        {
            headers: {
                "Content-Type": "application/json",
            },
        }
    )
}
