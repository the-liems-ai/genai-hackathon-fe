export interface Diagram {
    id: string
    name: string
    prompt: string
    mermaid: string
    json_diagram: string
    explain_node: string
}

export interface DiagramsResponse {
    data: Diagram[]
}

export interface Vertice {
    position: {
        x: number
        y: number
    }
    icon: string
    sub_graph: string
    id: string
    text: string
    shape: string
}

export interface Link {
    id: string
    from_id: string
    to_id: string
    text: string
    type: string
}

export interface DiagramResponse {
    data: {
        id: string
        name: string
        prompt: string
        data: {
            old: {
                vertices: Record<string, Vertice>
                links: Record<string, Link>
            }
            new: {
                vertices: Record<string, Vertice>
                links: Record<string, Link>
            }
        }
        image
    }
}
