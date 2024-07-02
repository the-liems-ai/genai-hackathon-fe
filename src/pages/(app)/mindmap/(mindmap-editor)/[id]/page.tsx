import { edgeTypes } from "@/edges";
import { useLayoutedElements, useRemoveLogo, useToggleAppShell } from "@/hooks";
import { nodeTypes } from "@/nodes";
import { useSelectedNodes } from "@/stores/selected-node-store";
import { ActionIcon } from "@mantine/core";
import { IconMaximize, IconMinimize } from "@tabler/icons-react";
import { useCallback, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    OnConnect,
    Panel,
    useEdgesState,
    useNodesState,
    useReactFlow,
    updateEdge,
    Edge,
    Connection,
    MarkerType,
} from "reactflow";
import { useMindmap } from "../_api/hooks";
import { convertEdge, convertNewNode } from "@/utils";
import { useCurrentMindmap } from "@/stores/mindmap-store";

const MindmapEditorPage = () => {
    const { id } = useParams();
    const { data, isPending } = useMindmap(+id);

    useRemoveLogo();
    const { fitView } = useReactFlow();
    const [nodes, setNodes, onNodesChange] = useNodesState([]);
    const [edges, setEdges, onEdgesChange] = useEdgesState([]);
    const reconnectDone = useRef(true);
    const onConnect: OnConnect = useCallback(
        (connection) => setEdges((eds) => addEdge(connection, eds)),
        [setEdges]
    );

    const onEdgeUpdateStart = useCallback(() => {
        reconnectDone.current = false;
    }, []);

    const onEdgeUpdate = useCallback(
        (oldEdge: Edge, newConnection: Connection) => {
            reconnectDone.current = true;
            setEdges((els) => updateEdge(oldEdge, newConnection, els));
        },
        []
    );

    const onEdgeUpdateEnd = useCallback((_: MouseEvent, edge: Edge) => {
        if (!reconnectDone.current) {
            setEdges((eds) => eds.filter((e) => e.id !== edge.id));
        }

        reconnectDone.current = true;
    }, []);

    const { setSelectedNodes } = useSelectedNodes();
    const onSelectionChange = useCallback(
        ({ nodes }) => {
            setSelectedNodes(nodes);
        },
        [setSelectedNodes]
    );

    const { appShellShowed, handleToggleAppShell } = useToggleAppShell();
    const { mindmap, setMindmap } = useCurrentMindmap();

    const { getLayoutedElements } = useLayoutedElements();

    useEffect(() => {
        if (isPending) return;
        if (!data) return;
        setMindmap(data?.data.data);
    }, [isPending, data]);

    useEffect(() => {
        if (mindmap) {
            setNodes(
                Object.values(mindmap?.json_diagram.new?.vertices).map(
                    (value) => {
                        return convertNewNode(value);
                    }
                )
            );
            setEdges(
                Object.values(mindmap?.json_diagram.new?.links).map((value) =>
                    convertEdge(value)
                )
            );

            setTimeout(() => {
                // check if all node has x and y position is 0 then get layouted elements
                const isNotLayouted = Object.values(
                    mindmap?.json_diagram.new?.vertices
                ).every(
                    (value) => value.position.x === 0 && value.position.y === 0
                );

                if (isNotLayouted) {
                    getLayoutedElements();
                }
            }, 100);

            setTimeout(() => {
                fitView();
            }, 500);
        }
    }, [mindmap]);

    return (
        <ReactFlow
            nodes={nodes}
            edges={edges}
            nodeTypes={nodeTypes}
            edgeTypes={edgeTypes}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onEdgeUpdate={onEdgeUpdate}
            onEdgeUpdateStart={onEdgeUpdateStart}
            onEdgeUpdateEnd={onEdgeUpdateEnd}
            onSelectionChange={onSelectionChange}
            fitView
            defaultEdgeOptions={{
                animated: true,
                type: "floating",
                markerEnd: { type: MarkerType.ArrowClosed },
            }}
        >
            <Background />
            <Controls />

            <Panel position="bottom-right">
                <ActionIcon radius={"xl"} onClick={handleToggleAppShell}>
                    {appShellShowed ? (
                        <IconMaximize size={16} />
                    ) : (
                        <IconMinimize size={16} />
                    )}
                </ActionIcon>
            </Panel>
        </ReactFlow>
    );
};

export default MindmapEditorPage;