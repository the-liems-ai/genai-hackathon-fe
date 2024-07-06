import {
    Title,
    Text,
    Button,
    Container,
    Group,
    Stack,
    Textarea,
    Loader,
    SegmentedControl,
    FileInput,
    TextInput,
    Accordion,
} from "@mantine/core"
import { Dots } from "./_components/dots"
import classes from "./_components/HeroText.module.css"
import { Link, useNavigate, useParams } from "react-router-dom"
import { useState } from "react"
import { IconFile, IconLink, IconWand } from "@tabler/icons-react"
import toast from "react-hot-toast"
import { useCreateMindmap, useUploadFile, useUploadURL } from "../_api/hooks"

function NewMindmapPage() {
    const [prompt, setPrompt] = useState("")
    const [loading, setLoading] = useState(false)
    const [isUseAdditionalDocument, setIsUseAdditionalDocument] = useState<
        string | null
    >(null)
    const [documentType, setDocumentType] = useState("file")
    const [file, setFile] = useState<File | null>(null)
    const [link, setLink] = useState("")

    const navigate = useNavigate()
    const { orgId } = useParams()
    const { mutate: createMindmap } = useCreateMindmap()
    const { mutate: uploadFile } = useUploadFile()
    const { mutate: uploadURL } = useUploadURL()
    const handlePrompt = async () => {
        if (prompt.trim() === "") {
            toast.error("Please enter a message")
            return
        }

        handleUploadDocument()

        setLoading(true)

        const toastLoading = toast.loading("Generating mindmap...")

        createMindmap(prompt, {
            onSuccess: (data) => {
                toast.success("Mindmap generated successfully")
                navigate(`/${orgId}/mindmap/${data?.data.data.id}`)
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

    const handleUploadDocument = () => {
        if (isUseAdditionalDocument === "true") {
            switch (documentType) {
                case "file":
                    if (!file) {
                        toast.error("Please upload a file")
                        return
                    }
                    uploadFile(file, {
                        onError: (error) => {
                            toast.error(error.message)
                        },
                    })
                    break
                case "link":
                    if (link.trim() === "") {
                        toast.error("Please paste a link")
                        return
                    }
                    uploadURL(link, {
                        onError: (error) => {
                            toast.error(error.message)
                        },
                    })
                    break
            }
        }
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
                            minRows={5}
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

                    <Stack align="center" gap={4}>
                        {/* <Text c={"gray"}>
                            Upload file or paste a link to generate a mindmap
                        </Text> */}
                    </Stack>
                    <Container p={0} size={600} w={"100%"}>
                        <Accordion
                            value={isUseAdditionalDocument}
                            onChange={setIsUseAdditionalDocument}
                            variant="separated"
                        >
                            <Accordion.Item value="true">
                                <Accordion.Control>
                                    <Title order={3}>
                                        Additional documents
                                    </Title>
                                </Accordion.Control>
                                <Accordion.Panel>
                                    <SegmentedControl
                                        data={[
                                            {
                                                value: "file",
                                                label: "Upload file",
                                            },
                                            {
                                                value: "link",
                                                label: "Paste link",
                                            },
                                        ]}
                                        value={documentType}
                                        onChange={setDocumentType}
                                        fullWidth
                                        mb={8}
                                    />
                                    {documentType === "file" ? (
                                        <FileInput
                                            placeholder="Upload file"
                                            leftSection={<IconFile size={18} />}
                                            value={file}
                                            onChange={setFile}
                                            // accept docx, pdf, txt, doc
                                            accept=".docx,.pdf,.txt,.doc"
                                        />
                                    ) : (
                                        <TextInput
                                            placeholder="Paste url here"
                                            value={link}
                                            onChange={(e) =>
                                                setLink(e.currentTarget.value)
                                            }
                                            leftSection={<IconLink size={18} />}
                                        />
                                    )}
                                </Accordion.Panel>
                            </Accordion.Item>
                        </Accordion>
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
                            to={`/${orgId}/mindmap`}
                            disabled={loading}
                        >
                            Cancel
                        </Button>
                        <Button
                            size="lg"
                            leftSection={loading ? <></> : <IconWand />}
                            onClick={handlePrompt}
                            disabled={loading}
                        >
                            {loading ? <Loader size="sm" /> : "Generate"}
                        </Button>
                    </Group>
                </Stack>
            </Container>
        </div>
    )
}

export default NewMindmapPage
