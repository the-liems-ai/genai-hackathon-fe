import { AppShell, Button, ScrollArea, TextInput } from "@mantine/core";
import { useGenQuiz } from "../../../../_api/hooks";
import { useCurrentMindmap } from "@/stores/mindmap-store";
import { useSelectedNodes } from "@/stores/selected-node-store";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMindMapLoading } from "@/stores/mindmap-loading";
import { GenQuizResponse } from "@/types";
import { modals } from "@mantine/modals";
import PlayQuiz from "@/components/play-quiz";

const GenQuiz = () => {
    const { mutate: genQuiz } = useGenQuiz();
    const { mindmap } = useCurrentMindmap();
    const { selectedNodes } = useSelectedNodes();
    const [input, setInput] = useState("");
    const [loading, loadingHandlers] = useMindMapLoading();

    const handlePlayQuiz = (
        questions: GenQuizResponse["data"]["questions"]
    ) => {
        modals.open({
            title: "Quiz",
            size: "xl",
            children: <PlayQuiz questions={questions} />,
            scrollAreaComponent: ScrollArea.Autosize,
            closeOnEscape: false,
            closeOnClickOutside: false,
        });
    };
    const handleGenQuiz = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (selectedNodes.length === 0) {
            toast.error("Please select at least one node");
            return;
        }
        if (!mindmap) {
            toast.error("Mindmap not found");
            return;
        }

        loadingHandlers.start();
        const loadingToast = toast.loading("Generating quiz...");

        genQuiz(
            {
                request: {
                    input,
                    old_diagram: mindmap.mermaid,
                    chosen_nodes: selectedNodes.map((n) => ({
                        node_id: n.id,
                        title: n.data.label,
                    })),
                },
            },
            {
                onSuccess: (data) => {
                    toast.success("Quiz generated successfully");
                    handlePlayQuiz(data?.data.data.questions);
                },
                onError: (error) => {
                    toast.error(error.message);
                },
                onSettled: () => {
                    loadingHandlers.stop();
                    toast.dismiss(loadingToast);
                },
            }
        );
    };
    return (
        <AppShell.Section mt={12}>
            <form onSubmit={handleGenQuiz}>
                <TextInput
                    mb={8}
                    placeholder="Enter the topic that the AI ​​uses to generate the question set (optional)"
                    value={input}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        setInput(e.target.value)
                    }
                    disabled={loading}
                />
                <Button type="submit" fullWidth disabled={loading}>
                    Play
                </Button>
            </form>
        </AppShell.Section>
    );
};

export default GenQuiz;
