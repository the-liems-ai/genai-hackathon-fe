import { Button, Container, Group, Title } from "@mantine/core";
import MindmapCard from "./_components/mindmap-card";
import { useNavigate } from "react-router-dom";
import { useMindmaps } from "./_api/hooks";
import { useQueryParams } from "@/hooks";
import { SearchBar } from "./_components";

const PAGE_SIZE = 8;

const MindmapPage = () => {
    const { keyword, page } = useQueryParams();
    const { data, error, isLoading, isError } = useMindmaps({
        keyword,
        page: +page || 1,
        limit: PAGE_SIZE,
    });

    const navigate = useNavigate();
    const handleCreateMindmap = () => {
        navigate("/mindmap/new");
    };

    return (
        <Container size="xl">
            <Group justify="space-between" align="center" mt="lg" mb="xl">
                <Title order={1}>Mindmaps</Title>
                <Button color="green" onClick={handleCreateMindmap}>
                    Create new
                </Button>
            </Group>
            <SearchBar />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {data?.data.data.map((diagram) => (
                    <MindmapCard key={diagram.id} diagram={diagram} />
                ))}
            </div>
        </Container>
    );
};

export default MindmapPage;