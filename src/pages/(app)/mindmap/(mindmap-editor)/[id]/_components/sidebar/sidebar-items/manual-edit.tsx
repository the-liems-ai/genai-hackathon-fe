import { useMemo } from "react";
import { useReactFlow } from "reactflow";
import { AppShell, Button, Group } from "@mantine/core";
import {
    IconDownload,
    IconPlus,
    IconSitemap,
    IconTrash,
} from "@tabler/icons-react";
import { useLayoutedElements, useMindmapThumbnail } from "@/hooks";
import { downloadImage } from "@/utils";
import { useCurrentMindmap } from "@/stores/mindmap-store";

interface EditTool {
    icon: React.ReactNode;
    label: string;
    action: () => void | Promise<void>;
}

let id = 0;

const ManualEdit = () => {
    const reactflow = useReactFlow();
    const { getLayoutedElements } = useLayoutedElements();
    const getThumbnail = useMindmapThumbnail({
        width: 1920,
        height: 1080,
    });
    const {
        mindmap: { name },
    } = useCurrentMindmap();
    const editTools = useMemo<EditTool[]>(
        () => [
            {
                icon: <IconPlus size={28} />,
                label: "Add node",
                action: () => {
                    reactflow.addNodes({
                        id: `node_${id++}`,
                        type: "common",
                        position: {
                            x: 0,
                            y: -200,
                        },
                        data: {
                            label: `Node ${id}`,
                            verticeData: {
                                position: {
                                    x: 0,
                                    y: -200,
                                },
                                icon: "",
                                sub_graph: "",
                                id: `node_${id}`,
                                text: `Node ${id}`,
                                shape: "square",
                                note: "",
                            },
                        },
                    });
                    reactflow.fitView();
                },
            },
            {
                icon: <IconTrash size={28} />,
                label: "Clear canvas",
                action: () => {
                    reactflow.setEdges([]);
                    reactflow.setNodes([]);
                },
            },
            {
                icon: <IconSitemap size={28} />,
                label: "Auto layout",
                action: () => {
                    getLayoutedElements();
                },
            },
            {
                icon: <IconDownload size={28} />,
                label: "Download image",
                action: async () => {
                    const imageURL = await getThumbnail();
                    downloadImage(imageURL, name);
                },
            },
        ],
        []
    );

    return (
        <AppShell.Section mt={12}>
            <div className="flex flex-col gap-4">
                <div className="grid grid-cols-3 gap-2">
                    {editTools.map((tool, index) => (
                        <Button
                            variant="light"
                            key={index}
                            onClick={tool.action}
                            h={100}
                        >
                            <span className="flex flex-col items-center justify-center gap-2">
                                {tool.icon}
                                {tool.label}
                            </span>
                        </Button>
                    ))}
                </div>
            </div>
        </AppShell.Section>
    );
};

export default ManualEdit;
