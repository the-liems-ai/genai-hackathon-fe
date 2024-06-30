import type { Node, NodeTypes } from "reactflow"
import { CommonNode } from "./CommonNode"

export const initialNodes = [
    {
        id: "A",
        type: "common",
        data: { label: "child node 1" },
        position: { x: 10, y: 10 },
    },
    {
        id: "B",
        type: "circle",
        data: { label: "child node 2" },
        position: { x: 10, y: 90 },
    },
] satisfies Node[]

export const nodeTypes = {
    common: CommonNode,
} satisfies NodeTypes
