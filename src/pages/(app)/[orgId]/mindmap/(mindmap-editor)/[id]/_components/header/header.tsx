import {
    ActionIcon,
    AppShell,
    Divider,
    Group,
    Image,
    TextInput,
    Title,
} from "@mantine/core"
import { Link, useParams } from "react-router-dom"
import HeaderRightSection from "./header-right-section"
import { useCurrentMindmap } from "@/stores/mindmap-store"
import { useState } from "react"
import { IconCheck, IconEdit, IconX } from "@tabler/icons-react"

const Header = () => {
    const { mindmap, setMindmap } = useCurrentMindmap()
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState("")
    const { orgId } = useParams()

    const handleEdit = () => {
        setName(mindmap?.name)
        setEditMode(true)
    }

    const handleSave = () => {
        setEditMode(false)
        setMindmap({ ...mindmap, name })
    }

    const handleCancel = () => {
        setEditMode(false)
        setName(mindmap?.name)
    }
    return (
        <AppShell.Header>
            <Group h="100%" px="md" justify="space-between">
                <Group align="center">
                    <Link to={`/${orgId}/mindmap`}>
                        <Image src="/fav.png" alt="The Liems" h={40} />
                    </Link>
                    <Group>
                        <Title order={5}>GenAI Hackathon 2024</Title>
                        {mindmap?.name && (
                            <>
                                <Divider orientation="vertical" />
                                <Group gap={2} align="center">
                                    {!editMode ? (
                                        <Title order={5}>{mindmap?.name}</Title>
                                    ) : (
                                        <TextInput
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.currentTarget.value)
                                            }
                                            placeholder="Enter mindmap name"
                                        />
                                    )}

                                    {!editMode ? (
                                        <ActionIcon
                                            variant="transparent"
                                            onClick={handleEdit}
                                        >
                                            <IconEdit size={18} />
                                        </ActionIcon>
                                    ) : (
                                        <Group gap={2}>
                                            <ActionIcon
                                                variant="transparent"
                                                onClick={handleSave}
                                            >
                                                <IconCheck size={18} />
                                            </ActionIcon>
                                            <ActionIcon
                                                variant="transparent"
                                                onClick={handleCancel}
                                            >
                                                <IconX size={18} />
                                            </ActionIcon>
                                        </Group>
                                    )}
                                </Group>
                            </>
                        )}
                    </Group>
                </Group>
                <Group>
                    <HeaderRightSection />
                </Group>
            </Group>
        </AppShell.Header>
    )
}

export default Header
