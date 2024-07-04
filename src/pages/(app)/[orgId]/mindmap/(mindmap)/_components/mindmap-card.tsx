import { Diagram } from "@/types";
import { Card, Image, Text, Button, Group } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons-react";
import { Link } from "react-router-dom";
import { useDeleteMindmap } from "../_api/hooks";
import { modals } from "@mantine/modals";
import toast from "react-hot-toast";
import { useQueryClient } from "@tanstack/react-query";

function MindmapCard({
    diagram: { id, name, prompt, image },
}: {
    diagram: Diagram;
}) {
    const { mutate: deleteMindmap } = useDeleteMindmap();
    const queryClient = useQueryClient();
    const handleDelete = () => {
        modals.openConfirmModal({
            centered: true,
            title: "Are you sure?",
            children:
                "This action cannot be undone. Are you sure you want to delete?",
            labels: {
                cancel: "No",
                confirm: "Delete",
            },
            confirmProps: { color: "red" },
            onConfirm: () =>
                deleteMindmap(id, {
                    onSuccess: () => {
                        toast.success("Mindmap deleted");
                        queryClient.invalidateQueries({
                            queryKey: ["mindmaps"],
                        });
                    },
                    onError: () => {
                        toast.error("Failed to delete mindmap");
                    },
                    onSettled: () => {
                        modals.closeAll();
                    },
                }),
        });
    };
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder h={340}>
            <Card.Section h={160} className="overflow-hidden">
                <Link to={`/mindmap/${id}`}>
                    <Image
                        src={image}
                        height={160}
                        alt={name || "Mindmap"}
                        fallbackSrc={` https://placehold.co/300x160?text=${
                            prompt || "Mindmap"
                        }`}
                        className="h-full"
                    />
                </Link>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{name || "Mindmap"}</Text>
            </Group>

            <Text size="sm" c="dimmed" className="grow" lineClamp={2}>
                {prompt || "Mindmap description"}
            </Text>

            <Group mt="md" gap={8}>
                <Button
                    color="blue"
                    radius="md"
                    component={Link}
                    to={`/mindmap/${id}`}
                    leftSection={<IconEdit size={16} />}
                    className="grow"
                >
                    Edit
                </Button>
                <Button
                    radius="md"
                    color="red"
                    px="sm"
                    variant="outline"
                    onClick={handleDelete}
                >
                    <IconTrash size={16} />
                </Button>
            </Group>
        </Card>
    );
}

export default MindmapCard;