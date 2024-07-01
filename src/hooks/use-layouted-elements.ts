import ELK, { LayoutOptions } from "elkjs/lib/elk.bundled"
import { useCallback } from "react"
import { Node, useReactFlow } from "reactflow"

const elk = new ELK()

const useLayoutedElements = () => {
    const { getNodes, setNodes, getEdges, fitView } = useReactFlow()
    const defaultOptions: LayoutOptions = {
        "elk.algorithm": "layered",
        "elk.layered.spacing.nodeNodeBetweenLayers": "150",
        "elk.spacing.nodeNode": "40",
        "elk.direction": "RIGHT",
        "elk.alignment": "CENTER",
    }

    const getLayoutedElements = useCallback((options?: LayoutOptions) => {
        const layoutOptions = { ...defaultOptions, ...options }
        const graph = {
            id: "root",
            layoutOptions: layoutOptions,
            children: getNodes(),
            edges: getEdges(),
        }

        elk.layout(graph as any).then(({ children }) => {
            children = children.map((node: any) => {
                if (!node) return
                return {
                    ...node,
                    position: {
                        x: node.x,
                        y: node.y,
                    },
                }
            })

            setNodes(children as Node<any>[])
            window.requestAnimationFrame(() => {
                fitView()
            })
        })
    }, [])

    return { getLayoutedElements }
}

export default useLayoutedElements
