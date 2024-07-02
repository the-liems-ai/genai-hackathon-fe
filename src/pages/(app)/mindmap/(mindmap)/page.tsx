import { Button, Container, Group, Title } from "@mantine/core";
import MindmapCard from "./_components/mindmap-card";
import { useNavigate } from "react-router-dom";
import { useMindmaps } from "./_api/hooks";
import { useQueryParams } from "@/hooks";
import { MindmapCardSkeleton, PaginationBar, SearchBar } from "./_components";
import { useMemo } from "react";

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

    const total = useMemo(
        () => Math.ceil(data?.data.pagination.total / PAGE_SIZE),
        [data?.data.pagination.total]
    );

    return (
        <Container size="xl">
            <Group justify="space-between" align="center" mt="lg" mb="lg">
                <Title order={1}>Mindmaps</Title>
                <Button color="green" onClick={handleCreateMindmap}>
                    Create new
                </Button>
            </Group>
            <SearchBar />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading
                    ? Array.from({ length: 8 }).map((_, i) => (
                          <MindmapCardSkeleton />
                      ))
                    : data?.data.data.map((diagram) => (
                          <MindmapCard key={diagram.id} diagram={diagram} />
                      ))}
            </div>
            <PaginationBar total={total} />
        </Container>
    );
};

export default MindmapPage;