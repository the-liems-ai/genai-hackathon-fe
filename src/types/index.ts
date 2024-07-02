export interface JSONDiagram {
    old: {
        vertices: Record<string, OldVertice>;
        links: Record<string, Link>;
        sub_graphs: {};
    };
    new: {
        vertices: Record<string, NewVertice>;
        links: Record<string, Link>;
        sub_graphs: {};
    };
}
export interface Diagram {
    id: number;
    name: string;
    prompt: string;
    mermaid: string;
    json_diagram: JSONDiagram;
    explain_node: string;
    image: string;
    summary: string;
}

export interface DiagramsResponse {
    data: Diagram[];
    pagination: {
        has_next: boolean;
        limit: number;
        offset: number;
        total: number;
    };
}

export interface OldVertice {
    position: {
        x: number;
        y: number;
    };
    icon: string;
    sub_graph: string;
    id: string;
    text: string;
    shape: string;
}

export interface NewVertice {
    position: {
        x: number;
        y: number;
    };
    icon: string;
    sub_graph: string;
    id: string;
    text: string;
    shape: string;
    note: string;
}

export interface Link {
    id: string;
    from_id: string;
    to_id: string;
    text: string;
    type: string;
}

export interface CreateDigramResponse {
    data: {
        id: number;
        name: string;
        prompt: string;
        mermaid: string;
        json_diagram: JSONDiagram;
        explain_node: string;
        image: string;
        summary: string;
    };
}

export interface DiagramResponse {
    data: {
        ID: number;
        name: string;
        prompt: string;
        mermaid: string;
        json_diagram: JSONDiagram;
        image: string;
        summary: string;
    };
}

export interface EditNodesRequest {
    input: string;
    old_diagram: string;
    chosen_nodes: {
        node_id: string;
        title: string;
    }[];
}

export interface EditNodesResponse {
    data: {
        id: number;
        name: string;
        prompt: string;
        mermaid: string;
        json_diagram: JSONDiagram;
        explain_node: string;
        image: string;
        summary: string;
    };
}

export interface AskNodeRequest {
    input: string;
    old_diagram: string;
    chosen_nodes: {
        node_id: string;
        title: string;
    }[];
}

export interface AskNodeResponse {
    data: string;
}

export interface ExplainNodeRequest {
    input: string;
    old_diagram: string;
    chosen_nodes: {
        node_id: string;
        title: string;
    }[];
}

export interface ExplainNodeResponse {
    data: string;
}

export interface SummaryResponse {
    data: string;
}

export interface ExplainNode {
    node_id: string;
    note: string;
}

export interface SaveDiagramRequest {
    name: string;
    mermaid: string;
    json_diagram: string;
    explain_node: string;
    image: string;
    summary: string;
}

export interface SaveDiagramResponse {
    data: {
        id: number;
        name: string;
        prompt: string;
        mermaid: string;
        json_diagram: JSONDiagram;
        explain_node: ExplainNode[];
        image: string;
        summary: string;
    };
}