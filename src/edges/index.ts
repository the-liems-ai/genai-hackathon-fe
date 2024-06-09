import type { Edge, EdgeTypes } from "reactflow"

export const initialEdges = [
    {
        id: "[A]-->[B]",
        source: "A",
        target: "B",
        ariaLabel: "",
    },
] satisfies Edge[]

export const edgeTypes = {} satisfies EdgeTypes
