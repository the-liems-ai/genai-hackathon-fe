import { GenQuizResponse } from "@/types";
import { Button, Group, Stack, Text, Title } from "@mantine/core";
import { useListState } from "@mantine/hooks";
import { modals } from "@mantine/modals";
import { IconCheck, IconX } from "@tabler/icons-react";
import { useState } from "react";

const PlayQuiz = ({
    questions,
}: {
    questions: GenQuizResponse["data"]["questions"];
}) => {
    const [isShowAnswer, setShowAnswer] = useState(false);
    const [userAnswers, userAnswersHandlers] = useListState(
        questions.map((q) => {
            return {
                answer: "",
            };
        })
    );

    const handleSelectAnswer = (
        questionIndex: number,
        question: GenQuizResponse["data"]["questions"][number],
        userAnswer: string
    ) => {
        if (isShowAnswer) return;
        userAnswersHandlers.setItem(questionIndex, {
            answer: userAnswer,
        });
    };

    const getButtonColorVariant = (
        answer: string,
        userAnswer: string,
        correctAnswer: string
    ) => {
        if (!isShowAnswer) {
            return {
                color: "blue",
                variant: userAnswer === answer ? "filled" : "default",
            };
        } else {
            return {
                color:
                    correctAnswer === answer
                        ? "green"
                        : userAnswer === answer
                        ? "red"
                        : "blue",
                variant:
                    correctAnswer === answer || userAnswer === answer
                        ? "filled"
                        : "default",
            };
        }
    };
    return (
        <>
            <Stack mb={12}>
                {questions.map((q, index) => (
                    <div
                        key={q.question}
                        className="border border-black/30 rounded p-4"
                    >
                        <Group mb={12}>
                            <Title order={5} c={"blue"}>
                                Question {index + 1}:
                            </Title>
                            <Title order={5}>{q.question}</Title>
                            {isShowAnswer &&
                                (userAnswers[index].answer ===
                                q.correct_answer ? (
                                    <IconCheck color="green" />
                                ) : (
                                    <IconX color="red" />
                                ))}
                        </Group>
                        <div className="grid grid-cols-2 gap-2">
                            {Object.entries(q.answers).map(([key, value]) => (
                                <Button
                                    key={key + value}
                                    size="md"
                                    variant={
                                        getButtonColorVariant(
                                            key,
                                            userAnswers[index].answer,
                                            q.correct_answer
                                        ).variant
                                    }
                                    color={
                                        getButtonColorVariant(
                                            key,
                                            userAnswers[index].answer,
                                            q.correct_answer
                                        ).color
                                    }
                                    onClick={() =>
                                        handleSelectAnswer(index, q, key)
                                    }
                                >
                                    <Text fw={700} mr={4}>
                                        {key}
                                    </Text>
                                    - {value}
                                </Button>
                            ))}
                        </div>
                    </div>
                ))}
            </Stack>
            {!isShowAnswer ? (
                <Button
                    color="green"
                    fullWidth
                    size="md"
                    onClick={() => setShowAnswer(true)}
                    disabled={userAnswers.some((a) => a.answer === "")}
                >
                    Show answer
                </Button>
            ) : (
                <Button fullWidth size="md" onClick={() => modals.closeAll()}>
                    Close
                </Button>
            )}
        </>
    );
};
export default PlayQuiz;