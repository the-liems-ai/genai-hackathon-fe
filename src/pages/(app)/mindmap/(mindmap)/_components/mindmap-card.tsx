import { Card, Image, Text, Button, Group } from "@mantine/core"
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
                <Image
                    src={imageUrl}
                    height={160}
                    alt={title || "Mindmap"}
                    fallbackSrc={` https://placehold.co/300x160?text=${
                        title || "Mindmap"
                    }`}
                />
            </Card.Section>

            <Group justify="space-between" mt="md" mb="xs">
                <Text fw={500}>{title || "Mindmap"}</Text>
            </Group>

            <Text size="sm" c="dimmed">
                {description || "Mindmap description"}
            </Text>

            <Button
                color="blue"
                fullWidth
                mt="md"
                radius="md"
                component={Link}
                to={`/mindmap/${href}`}
            >
                Open
            </Button>
        </Card>
    )
}

export default MindmapCard
