import { Diagram } from "@/types"
import { Card, Image, Text, Button, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"

function MindmapCard({
    diagram: { id, name, prompt, image },
}: {
    diagram: Diagram
}) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Link to={`/mindmap/${id}`}>
                    <Image
                        src={""}
                        height={160}
                        alt={name || "Mindmap"}
                        fallbackSrc={` https://placehold.co/300x160?text=${
                            name || "Mindmap"
                        }`}
                    />
                </Link>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{name || "Mindmap"}</Text>
            </Group>

            <Text size="sm" c="dimmed">
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
                <Button radius="md" color="red" px="sm" variant="outline">
                    <IconTrash size={16} />
                </Button>
            </Group>
        </Card>
    )
}

export default MindmapCard
