import { Button, Container, Group, Title } from "@mantine/core"
import MindmapCard from "./_components/mindmap-card"
import { useNavigate } from "react-router-dom"
import { useDiagrams } from "./_api/hooks"

const MindmapPage = () => {
    const { data, error, isLoading, isError } = useDiagrams()

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
                {data?.data.map((diagram, index) => (
                    <MindmapCard key={index} diagram={diagram} />
                ))}
            </div>
        </Container>
    )
}

export default MindmapPage
