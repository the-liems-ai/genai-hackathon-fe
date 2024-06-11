import type { Node, NodeTypes } from "reactflow"
import { StadiumShapedNode } from "./StadiumShapedNode"
import { CircleNode } from "./CircleNode"
import { RhombusNode } from "./RhombusNode"
import { CommonNode } from "./CommonNode"
import SubGraphNode from "./SubGraphNode"
import { GroupShape } from "./GroupShape"

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
    "stadium-shaped": StadiumShapedNode,
    circle: CircleNode,
    rhombus: RhombusNode,
    subgraph: SubGraphNode,
    "custom-group": GroupShape,
} satisfies NodeTypes
