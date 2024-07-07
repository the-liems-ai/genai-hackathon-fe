import { Button, Container, Group, Stack, Title } from "@mantine/core"
import MindmapCard from "./_components/mindmap-card"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useMindmaps } from "./_api/hooks"
import { useQueryParams } from "@/hooks"
import { MindmapCardSkeleton, PaginationBar, SearchBar } from "./_components"
import { useMemo } from "react"
import { IconMoodSad } from "@tabler/icons-react"
import { useClearVtDb } from "../(mindmap-editor)/_api/hooks"
import { aiInstance } from "@/utils/axios"

const PAGE_SIZE = 8

const MindmapPage = () => {
    const { keyword, page } = useQueryParams()
    const { orgId } = useParams()
    const { data, isLoading } = useMindmaps({
        keyword,
        page: +page || 1,
        limit: PAGE_SIZE,
        orgId,
    })

    const total = useMemo(
        () => Math.ceil(data?.data.pagination.total / PAGE_SIZE),
        [data?.data.pagination.total]
    )

    const navigate = useNavigate()
    const { mutate: clearVtDb } = useClearVtDb()
    const handleCreateMindmap = async () => {
        await aiInstance.post("/rag/text-upload/requirement", "")
        navigate(`/${orgId}/mindmap/new`)
    }

    return (
        <Container size="xl">
            <Group justify="space-between" align="center" mt="lg" mb="md">
                <Title order={1}>Mindmaps</Title>
                <Button onClick={handleCreateMindmap} color="green">
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
                        <MindmapCardSkeleton key={i} />
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
    )
}

export default MindmapPage
