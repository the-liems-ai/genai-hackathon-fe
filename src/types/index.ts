export interface OldVertice {
    position: {
        x: number
        y: number
    }
    icon: string
    sub_graph: string
    id: string
    text: string
    shape: string
    color: string
    width: number
    height: number
    layer: number
}

export interface NewVertice {
    position: {
        x: number
        y: number
    }
    icon: string
    sub_graph: string
    id: string
    text: string
    shape: string
    note: string
}

export interface JSONDiagram {
    old: {
        vertices: Record<string, OldVertice>
        links: Record<string, Link>
        sub_graphs: {}
    }
    new: {
        vertices: Record<string, NewVertice>
        links: Record<string, Link>
        sub_graphs: {}
    }
}
export interface Diagram {
    id: number
    name: string
    prompt: string
    mermaid: string
    json_diagram: JSONDiagram
    explain_node: string
    image: string
    summary: string
}

export interface DiagramsResponse {
    data: Diagram[]
    pagination: {
        has_next: boolean
        limit: number
        offset: number
        total: number
    }
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
        json_diagram: JSONDiagram
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
        json_diagram: JSONDiagram
        image: string
        summary: string
    }
}

export interface EditNodesRequest {
    input: string
    old_diagram: string
    chosen_nodes: {
        node_id: string
        title: string
    }[]
}

export interface EditNodesResponse {
    data: {
        id: number
        name: string
        prompt: string
        mermaid: string
        json_diagram: JSONDiagram
        explain_node: string
        image: string
        summary: string
    }
}

export interface AskNodeRequest {
    input: string
    old_diagram: string
    chosen_nodes: {
        node_id: string
        title: string
    }[]
}

export interface AskNodeResponse {
    data: string
}

export interface ExplainNodeRequest {
    input: string
    old_diagram: string
    chosen_nodes: {
        node_id: string
        title: string
    }[]
}

export interface ExplainNodeResponse {
    data: string
}

export interface SummaryResponse {
    data: string
}

export interface ExplainNode {
    node_id: string
    note: string
}

export interface SaveDiagramRequest {
    name: string
    mermaid: string
    json_diagram: string
    explain_node: string
    image: string
    summary: string
}

export interface SaveDiagramResponse {
    data: {
        id: number
        name: string
        prompt: string
        mermaid: string
        json_diagram: JSONDiagram
        explain_node: ExplainNode[]
        image: string
        summary: string
    }
}

export interface GenQuizRequest {
    input: string
    old_diagram: string
    chosen_nodes: {
        node_id: string
        title: string
    }[]
}

export interface Quiz {
    question: string
    answers: Record<string, string>
    correct_answer: string
}
export interface GenQuizResponse {
    data: {
        questions: Quiz[]
    }
}

export interface OrganizationUserResponse {
    id: string
    name: string
    image?: string
    metadata?: string
    created_at: string
    is_owner: boolean
}
export interface UserResponse {
    id: number
    created_at: string
    email: string
    name: string
    given_name: string
    family_name: string
    picture: string
    locale?: string
    metadata?: string
    organizations: OrganizationUserResponse[]
}

export interface GetOrgRequestParams {
    orgId: string
}

export interface CreateOrgRequest {
    name: string
}

export interface UpdateOrgRequest {
    name: string
}

export interface AddUserToOrgRequest {
    usersEmail: string[]
}

export interface RemoveUserFromOrgRequest {
    usersEmail: string[]
}

export interface TransferOwnershipRequest {
    newOwnerEmail: string
}

export interface UserOrganizationResponse {
    id: number
    name: string
    email: string
    locale?: string
    picture?: string
    metadata?: string
    created_at: string
    given_name: string
    family_name: string
    is_owner: boolean
}

export interface OrgResponse {
    id: string
    created_at: string
    name: string
    image?: string
    metadata?: string
    users: UserOrganizationResponse[]
}
