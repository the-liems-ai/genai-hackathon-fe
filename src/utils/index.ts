import { BaseNodeData } from "@/nodes/BaseNode";
import { Link, OldVertice, NewVertice } from "@/types";
import DOMPurify from "dompurify";
import { marked } from "marked";
import { Edge, Node } from "reactflow";

export const getParams = (pathname: string) => {
    return pathname.split("/").at(-1);
};

export const convertOldNode = (
    node: OldVertice
): Node<{
    label: string;
    verticeData: OldVertice;
}> => {
    return {
        id: node.id,
        type: "common",
        data: { label: node.text, verticeData: node },
        position: { x: node.position.x, y: node.position.y },
    };
};

export const convertNewNode = (node: NewVertice): Node<BaseNodeData> => {
    return {
        id: node.id,
        type: "common",
        data: { label: node.text, note: node.note },
        position: { x: node.position.x, y: node.position.y },
    };
};

export const convertEdge = (edge: Link): Edge => {
    return {
        id: edge.id,
        source: edge.from_id,
        target: edge.to_id,
        label: edge.text,
        ariaLabel: edge.text,
    };
};

export const parseMarkdownToHTML = (note: string): string => {
    const result = marked.parse(note);
    return DOMPurify.sanitize(result as string);
};

export const convertNodeToVertice = (node: Node<BaseNodeData>): NewVertice => {
    return {
        position: {
            x: Math.round(node.position.x),
            y: Math.round(node.position.y),
        },
        icon: "",
        sub_graph: "",
        id: node.id,
        text: node.data.label,
        shape: "square",
        note: node.data.note,
    };
};

export const convertEdgeToLink = (edge: Edge): Link => {
    return {
        id: edge.id,
        from_id: edge.source!,
        to_id: edge.target!,
        text: "",
        type: "-->",
    };
};

export const convertNodesToVertices = (
    nodes: Node<BaseNodeData>[]
): Record<string, NewVertice> => {
    return nodes.reduce((acc, node) => {
        acc[node.id] = convertNodeToVertice(node);
        return acc;
    }, {} as Record<string, NewVertice>);
};

export const convertEdgesToLinks = (edges: Edge[]): Record<string, Link> => {
    return edges.reduce((acc, edge) => {
        acc[edge.id!] = convertEdgeToLink(edge);
        return acc;
    }, {} as Record<string, Link>);
};

export const downloadImage = (dataUrl: string, name: string = "Mindmap") => {
    const a = document.createElement("a");

    a.setAttribute("download", name);
    a.setAttribute("href", dataUrl);
    a.click();
};