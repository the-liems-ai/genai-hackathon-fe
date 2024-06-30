import {
    Title,
    Text,
    Button,
    Container,
    Group,
    Stack,
    Textarea,
} from "@mantine/core"
import { Dots } from "./_components/dots"
import classes from "./_components/HeroText.module.css"
import { Link, useNavigate } from "react-router-dom"
import { useState } from "react"
import { IconWand } from "@tabler/icons-react"
import toast from "react-hot-toast"
import { useCreateMindmap } from "../_api/hooks"

function NewMindmapPage() {
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    const { mutate: createMindmap } = useCreateMindmap()
    const handlePrompt = async () => {
        if (prompt.trim() === "") {
            toast.error("Please enter a message")
            return
        }

        setLoading(true)

        const toastLoading = toast.loading("Generating mindmap...")

        createMindmap(prompt, {
            onSuccess: (data) => {
                toast.success("Mindmap generated successfully")
                navigate(`/mindmap/${data?.data.data.id}`)
            },
            onError: (error) => {
                toast.error(error.message)
            },
            onSettled: () => {
                setLoading(false)
                toast.dismiss(toastLoading)
            },
        })
    }
    return (
        <div className="flex items-center justify-center h-screen w-full">
            <Container className={classes.wrapper} size={1400} w={"100%"}>
                <Dots className={classes.dots} style={{ left: 0, top: 0 }} />
                <Dots className={classes.dots} style={{ left: 60, top: 0 }} />
                <Dots className={classes.dots} style={{ left: 0, top: 140 }} />
                <Dots className={classes.dots} style={{ right: 0, top: 60 }} />

                <Stack pos={"relative"} align="center">
                    <Title>
                        Turn everything into a{" "}
                        <Text component="span" c={"blue"} inherit>
                            Mindmap
                        </Text>{" "}
                    </Title>

                    <Container p={0} size={1000} w={"100%"}>
                        <Textarea
                            className="grow"
                            placeholder="Write your thoughts here to generate a mindmap"
                            autosize
                            minRows={10}
                            maxRows={10}
                            onChange={(e) => setPrompt(e.currentTarget.value)}
                            value={prompt}
                            disabled={loading}
                            onKeyDown={(e) => {
                                if (e.key === "Enter" && !e.shiftKey) {
                                    e.preventDefault()
                                    handlePrompt()
                                }
                            }}
                        />
                    </Container>
                    <Text size="sm" c="gray">
                        Any information generated from AI may not be absolutely
                        accurate, please verify before use
                    </Text>
                    <Group>
                        <Button
                            size="lg"
                            variant="default"
                            color="gray"
                            component={Link}
                            to={"/mindmap"}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            leftSection={<IconWand />}
                            onClick={handlePrompt}
                            disabled={loading}
                        >
                            Generate
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </div>
    )
}

export default NewMindmapPage
