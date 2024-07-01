import { useCurrentMindmap } from "@/stores/mindmap-store"
import { AppShell, Button, Text, Tooltip } from "@mantine/core"
import { IconCopy } from "@tabler/icons-react"
import { useSummary } from "../../../../_api/hooks"
import { useMindMapLoading } from "@/stores/mindmap-loading"
import toast from "react-hot-toast"
import { useQueryClient } from "@tanstack/react-query"
import ReactMarkdown from "react-markdown"
import { useClipboard } from "@mantine/hooks"

const Summary = () => {
    const { mindmap } = useCurrentMindmap()

    const [loading, loadingHandlers] = useMindMapLoading()

    const queryClient = useQueryClient()
    const { mutate: summaryMutate } = useSummary()
    const handleSummary = () => {
        loadingHandlers.start()
        const loadingToast = toast.loading("Generating summary...")

        summaryMutate(mindmap.ID, {
            onSuccess: () => {
                toast.success("Summary generated")
                queryClient.invalidateQueries({
                    queryKey: ["mindmap", mindmap.ID],
                })
            },
            onError: (error) => {
                toast.error("Failed to generate summary")
            },
            onSettled: () => {
                loadingHandlers.stop()
                toast.dismiss(loadingToast)
            },
        })
    }

    const clipboard = useClipboard({ timeout: 1000 })

    return (
        <>
            <AppShell.Section mt={12}>
                <Button.Group>
                    <Button
                        className="grow"
                        disabled={loading}
                        onClick={handleSummary}
                    >
                        Generate summary
                    </Button>
                    <Tooltip
                        label={"Copied!"}
                        disabled={!clipboard.copied}
                        position="right"
                        withArrow
                    >
                        <Button
                            variant="light"
                            disabled={mindmap.summary.trim() === "" || loading}
                            onClick={() => clipboard.copy(mindmap.summary)}
                        >
                            <IconCopy size={18} />
                        </Button>
                    </Tooltip>
                </Button.Group>
            </AppShell.Section>
            <AppShell.Section mt={8}>
                <Text size="xs" c="gray">
                    Any information generated from AI may not be absolutely
                    accurate, please verify first
                </Text>
            </AppShell.Section>
            <AppShell.Section mt={8}>
                {mindmap.summary.trim() !== "" && (
                    <div className="text-sm border p-3 rounded-sm">
                        <ReactMarkdown>{mindmap.summary}</ReactMarkdown>
                    </div>
                )}
            </AppShell.Section>
        </>
    )
}

export default Summary
