import { CommonNodeData } from "@/nodes/CommonNode"
import { Link, Vertice } from "@/types"
import { Edge, Node, NodeProps } from "reactflow"

export const getParams = (pathname: string) => {
    return pathname.split("/").at(-1)
}

export const convertNode = (
    node: Vertice
): Node<{
    label: string
}> => {
    // if (node.id !== "") {
    return {
        id: node.id,
        type: "common",
        data: { label: node.text },
        position: { x: node.position.x, y: node.position.y },
    }
    // }
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
