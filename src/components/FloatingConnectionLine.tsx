import { getEdgeParams } from "@/utils";
import { getBezierPath } from "reactflow";

function FloatingConnectionLine({
    toX,
    toY,
    fromPosition,
    toPosition,
    fromNode,
}) {
    if (!fromNode) {
        return null;
    }

    const targetNode = {
        id: "connection-target",
        width: 1,
        height: 1,
        positionAbsolute: { x: toX, y: toY },
    };

    const { sx, sy } = getEdgeParams(fromNode, targetNode as any);
    const [edgePath] = getBezierPath({
        sourceX: sx,
        sourceY: sy,
        sourcePosition: fromPosition,
        targetPosition: toPosition,
        targetX: toX,
        targetY: toY,
    });

    return (
        <g>
            <path
                fill="none"
                stroke="#222"
                strokeWidth={1.5}
                className="animated"
                d={edgePath}
            />
            <circle
                cx={toX}
                cy={toY}
                fill="#fff"
                r={3}
                stroke="#222"
                strokeWidth={1.5}
            />
        </g>
    );
}

export default FloatingConnectionLine;