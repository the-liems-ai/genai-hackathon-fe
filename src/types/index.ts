export interface Diagram {
    id: number
    name: string
    prompt: string
    mermaid: string
    json_diagram: string
    explain_node: string
    image: string
    summary: string
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

export interface CreateDigramResponse {
    data: {
        id: number
        name: string
        prompt: string
        mermaid: string
        json_diagram: {
            old: {
                vertices: Record<string, Vertice>
                links: Record<string, Link>
            }
            new: {
                vertices: Record<string, Vertice>
                links: Record<string, Link>
            }
        }
        explain_node: string
        image: string
        summary: string
    }
}

export interface DiagramResponse {
    data: {
        ID: number
        name: string
        prompt: string
        mermaid: string
        json_diagram: {
            old: {
                vertices: Record<string, Vertice>
                links: Record<string, Link>
            }
            new: {
                vertices: Record<string, Vertice>
                links: Record<string, Link>
            }
        }
        image: string
        summary: string
    }
}
