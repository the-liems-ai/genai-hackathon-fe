export interface DiagramResponse {
    id: string
    name: string
    prompt: string
    mermaid: string
    json_diagram: string
    explain_node: string
}

export interface DiagramsResponse {
    data: DiagramResponse[]
}
