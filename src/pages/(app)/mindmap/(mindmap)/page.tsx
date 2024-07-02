import { Button, Container, Group, Stack, Title } from "@mantine/core";
import MindmapCard from "./_components/mindmap-card";
import { useNavigate } from "react-router-dom";
import { useMindmaps } from "./_api/hooks";
import { useQueryParams } from "@/hooks";
import { MindmapCardSkeleton, PaginationBar, SearchBar } from "./_components";
import { useMemo } from "react";
import { IconMoodSad } from "@tabler/icons-react";

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
            <Group justify="space-between" align="center" mt="lg" mb="md">
                <Title order={1}>Mindmaps</Title>
                <Button color="green" onClick={handleCreateMindmap}>
                    Create new
                </Button>
            </Group>
            <SearchBar />
            {keyword && keyword.trim() !== "" && (
                <Title order={4} mb={"lg"}>
                    Result for "{keyword}"{" "}
                    {!isLoading &&
                        `(${data?.data.pagination.total} result${
                            data?.data.pagination.total > 1 ? "s" : ""
                        })`}
                </Title>
            )}
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {isLoading ? (
                    Array.from({ length: 8 }).map((_, i) => (
                        <MindmapCardSkeleton />
                    ))
                ) : data?.data.pagination.total === 0 ? (
                    <Stack
                        justify="center"
                        align="center"
                        className="col-span-full"
                        h={"calc(100vh - 500px)"}
                    >
                        <IconMoodSad size={100} color="gray" />
                        <Title order={3} c={"gray"}>
                            No result found
                        </Title>
                    </Stack>
                ) : (
                    data?.data.data.map((diagram) => (
                        <MindmapCard key={diagram.id} diagram={diagram} />
                    ))
                )}
            </div>
            <PaginationBar total={total} />
        </Container>
    );
};

export default MindmapPage;
