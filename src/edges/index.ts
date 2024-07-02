import type { Edge, EdgeTypes } from "reactflow";
import FloatingEdge from "./FloatingEdge";

export const initialEdges = [
    {
        id: "[A]-->[B]",
        source: "A",
        target: "B",
        ariaLabel: "",
        type: "float"
    },
] satisfies Edge[];

export const edgeTypes = {
    floating: FloatingEdge,
} satisfies EdgeTypes;