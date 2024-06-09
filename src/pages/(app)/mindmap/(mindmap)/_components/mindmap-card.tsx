import { Card, Image, Text, Button, Group } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react"
import { Link } from "react-router-dom"

interface MindmapCardProps {
    imageUrl?: string
    title?: string
    description?: string
    href: string
}

function MindmapCard({ imageUrl, title, description, href }: MindmapCardProps) {
    return (
        <Card shadow="sm" padding="lg" radius="md" withBorder>
            <Card.Section>
                <Link to={`/mindmap/${href}`}>
                    <Image
                        src={imageUrl}
                        height={160}
                        alt={title || "Mindmap"}
                        fallbackSrc={` https://placehold.co/300x160?text=${
                            title || "Mindmap"
                        }`}
                    />
                </Link>
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title || "Mindmap"}</Text>
            </Group>

            <Text size="sm" c="dimmed">
                {description || "Mindmap description"}
            </Text>

            <Group mt="md" gap={8}>
                <Button
                    color="blue"
                    radius="md"
                    component={Link}
                    to={`/mindmap/${href}`}
                    leftSection={<IconEdit size={16} />}
                    className="grow"
                >
                    Edit
                </Button>
                <Button radius="md" color="red" px="sm">
                    <IconTrash size={16} />
                </Button>
            </Group>
        </Card>
    )
}

export default MindmapCard
