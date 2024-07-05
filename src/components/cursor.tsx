import { cn } from "@/utils/cn"

export default function Cursor({
    color,
    x,
    y,
    name,
}: {
    color: string
    x: number
    y: number
    name: string
}) {
    return (
        <div
            style={{
                position: "absolute",
                top: "0",
                left: "0",
                transform: `translate(${x}px, ${y}px)`,
                transition: "transform 120ms linear",
                zIndex: 999,
            }}
        >
            <CursorSvg color={color} />
            {name && name.trim() !== "" && (
                <div
                    className="-translate-y-5 translate-x-2 text-white rounded-full px-2 py-1 text-xs"
                    style={{
                        backgroundColor: color,
                    }}
                >
                    {name}
                </div>
            )}
        </div>
    )
}

// SVG cursor shape
function CursorSvg({ color }) {
    return (
        <svg width="32" height="44" viewBox="0 0 24 36" fill="none">
            <path
                fill={color}
                d="M5.65376 12.3673H5.46026L5.31717 12.4976L0.500002 16.8829L0.500002 1.19841L11.7841 12.3673H5.65376Z"
            />
        </svg>
    )
}
