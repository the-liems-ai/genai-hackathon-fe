import { Button, Container, Group, Title } from "@mantine/core"
import MindmapCard from "./_components/mindmap-card"
import { useMemo } from "react"
import { useNavigate } from "react-router-dom"

const MindmapPage = () => {
    const mockData = useMemo(
        () =>
            Array.from({ length: 8 }, (_, index) => ({
                imageUrl: `https://placehold.co/300x160?text=Mindmap+${index}`,
                title: `Mindmap ${index}`,
                description: `Mindmap description ${index}`,
                href: index.toString(),
            })),
        []
    )

    const navigate = useNavigate()
    const handleCreateMindmap = () => {
        navigate("/mindmap/new")
    }

    return (
        <Container size="xl">
            <Group justify="space-between" align="center" mt="lg" mb="xl">
                <Title order={1}>Mindmaps</Title>
                <Button color="green" onClick={handleCreateMindmap}>
                    Create new
                </Button>
            </Group>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {mockData.map((data, index) => (
                    <MindmapCard key={index} {...data} />
                ))}
            </div>
        </Container>
    )
}

export default MindmapPage
