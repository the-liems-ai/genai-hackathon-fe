import { Link, OldVertice, NewVertice } from "@/types"
import DOMPurify from "dompurify"
import { marked } from "marked"
import { Edge, Node } from "reactflow"

export const getParams = (pathname: string) => {
    return pathname.split("/").at(-1)
}

export const convertOldNode = (
    node: OldVertice
): Node<{
    label: string
    verticeData: OldVertice
}> => {
    return {
        id: node.id,
        type: "common",
        data: { label: node.text, verticeData: node },
        position: { x: node.position.x, y: node.position.y },
    }
}

export const convertNewNode = (
    node: NewVertice
): Node<{
    label: string
    verticeData: NewVertice
}> => {
    return {
        id: node.id,
        type: "common",
        data: { label: node.text, verticeData: node },
        position: { x: node.position.x, y: node.position.y },
    }
}

export const convertEdge = (edge: Link): Edge => {
    return {
        id: edge.id,
        source: edge.from_id,
        target: edge.to_id,
        label: edge.text,
        ariaLabel: edge.text,
    }
}

export const parseMarkdownToHTML = (note: string): string => {
    const result = marked.parse(note)
    return DOMPurify.sanitize(result as string)
}
