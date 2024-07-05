import { deleteOrg, leaveOrg } from "@/api/api"
import {
    useAddUsersToOrg,
    useDeleteOrg,
    useLeaveOrg,
    useOrg,
    useRemoveUsersFromOrg,
    useTransferOwnership,
    useUpdateOrg,
    useUser,
} from "@/api/hooks"
import { useAuth } from "@/stores/auth-store"
import { getCurrentOrg } from "@/stores/org-store"
import { UserOrganizationResponse } from "@/types"
import {
    Avatar,
    Badge,
    Button,
    Group,
    Menu,
    rem,
    Table,
    Tabs,
    TagsInput,
    Text,
    TextInput,
    Title,
    UnstyledButton,
} from "@mantine/core"
import { useListState } from "@mantine/hooks"
import { modals } from "@mantine/modals"
import {
    IconCheck,
    IconDotsVertical,
    IconEdit,
    IconInfoCircle,
    IconUsersGroup,
    IconX,
} from "@tabler/icons-react"
import { useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"

const AddUserMenu = () => {
    const [newEmails, newEmailsHandlers] = useListState<string>([])
    const [loading, setLoading] = useState(false)
    const queryClient = useQueryClient()
    const { mutate: addUsersToOrg } = useAddUsersToOrg()
    const handleAddUsers = () => {
        setLoading(true)
        addUsersToOrg(
            {
                usersEmail: newEmails,
            },
            {
                onSuccess: (data) => {
                    toast.success("Users added successfully")
                    queryClient.invalidateQueries({
                        queryKey: ["org", data.id],
                    })
                    modals.closeAll()
                },
                onError: (error) => {
                    toast.error(error.message)
                },
                onSettled: () => {
                    setLoading(false)
                },
            }
        )
    }
    return (
        <div className="flex flex-col gap-4">
            <TagsInput
                data={[]}
                value={newEmails}
                onChange={(value) => newEmailsHandlers.setState(value)}
                placeholder="Enter email and press Enter"
            />
            <div className="flex justify-end">
                <Button
                    color="green"
                    loading={loading}
                    onClick={handleAddUsers}
                >
                    Add
                </Button>
            </div>
        </div>
    )
}

const RoleBadge = ({ isOwner }: { isOwner: boolean }) => {
    return (
        <Badge variant="light" color={isOwner ? "red" : "blue"}>
            {isOwner ? "Owner" : "Member"}
        </Badge>
    )
}

const UserRow = ({ user }: { user: UserOrganizationResponse }) => {
    const { data: currentUser } = useUser()
    const isCurrentOwner = currentUser?.organizations.find(
        (org) => org.id === getCurrentOrg().currentOrg
    )?.is_owner

    const queryClient = useQueryClient()
    const { token } = useAuth()
    const { mutate: transferOwnership } = useTransferOwnership()
    const { mutate: removeUsersFromOrg } = useRemoveUsersFromOrg()

    const handleTransferOwnership = () => {
        transferOwnership(
            {
                newOwnerEmail: user.email,
            },
            {
                onSuccess: () => {
                    toast.success("Ownership transferred successfully")
                    queryClient.invalidateQueries({
                        queryKey: ["org", getCurrentOrg().currentOrg],
                    })
                    queryClient.invalidateQueries({
                        queryKey: ["user", token],
                    })
                    modals.closeAll()
                },
                onError: (error) => {
                    toast.error(error.message)
                },
            }
        )
    }

    const handleRemoveUser = () => {
        removeUsersFromOrg(
            {
                usersEmail: [user.email],
            },
            {
                onSuccess: () => {
                    toast.success("User removed successfully")
                    queryClient.invalidateQueries({
                        queryKey: ["org", getCurrentOrg().currentOrg],
                    })
                    modals.closeAll()
                },
                onError: (error) => {
                    toast.error(error.message)
                },
            }
        )
    }
    return (
        <Table.Tr>
            <Table.Td>
                <Avatar
                    size={26}
                    src={user.picture}
                    radius={26}
                    alt={user.name}
                >
                    {user.name.charAt(0)}
                </Avatar>
            </Table.Td>
            <Table.Td>
                <Text size="sm" fw={500}>
                    {user.name}
                </Text>
            </Table.Td>
            <Table.Td>{user.email}</Table.Td>
            <Table.Td>
                <RoleBadge isOwner={user.is_owner} />
            </Table.Td>
            <Table.Td>
                {!user.is_owner && isCurrentOwner && (
                    <Menu shadow="md">
                        <Menu.Target>
                            <UnstyledButton aria-label="Settings">
                                <IconDotsVertical
                                    color="gray"
                                    size={18}
                                    stroke={1.5}
                                />
                            </UnstyledButton>
                        </Menu.Target>

                        <Menu.Dropdown>
                            <Menu.Item onClick={handleTransferOwnership}>
                                Transfer Ownership
                            </Menu.Item>
                            <Menu.Item onClick={handleRemoveUser}>
                                Remove from Org
                            </Menu.Item>
                        </Menu.Dropdown>
                    </Menu>
                )}
            </Table.Td>
        </Table.Tr>
    )
}

const ConfirmDeleteOrg = () => {
    return (
        <div className="flex flex-col gap-4">
            <Text size="sm" c="red">
                Are you sure you want to delete this organization? This action
                is irreversible.
            </Text>
        </div>
    )
}

const OrgSettings = () => {
    const { data: org } = useOrg()
    const [editNameMode, setEditNameMode] = useState(false)
    const [name, setName] = useState(org?.name || "")
    const [loading, setLoading] = useState(false)

    const handleEditName = () => {
        setEditNameMode(true)
        setName(org?.name || "")
    }

    const { data: currentUser } = useUser()
    const isCurrentOwner = currentUser?.organizations.find(
        (org) => org.id === getCurrentOrg().currentOrg
    )?.is_owner
    const queryClient = useQueryClient()
    const { token } = useAuth()
    const { mutate: updateOrg } = useUpdateOrg()

    const handleDeleteOrg = async () => {
        deleteOrg().then(() => {
            queryClient.invalidateQueries({
                queryKey: ["user", token],
            })
            modals.closeAll()
            window.location.href = "/"
        })
    }

    const handleOpenConfirmDelete = () => {
        modals.openConfirmModal({
            title: "Delete organization",
            children: <ConfirmDeleteOrg />,
            labels: {
                confirm: "Delete organization",
                cancel: "No don't delete it",
            },
            confirmProps: { color: "red" },
            onConfirm: handleDeleteOrg,
        })
    }

    const handleLeaveOrg = async () => {
        leaveOrg().then(() => {
            queryClient.invalidateQueries({
                queryKey: ["user", token],
            })
            modals.closeAll()
            window.location.href = "/"
        })
    }

    const handleOpenConfirmLeave = () => {
        modals.openConfirmModal({
            title: "Leave organization",
            children: <ConfirmDeleteOrg />,
            labels: {
                confirm: "Leave organization",
                cancel: "No don't leave it",
            },
            confirmProps: { color: "orange" },
            onConfirm: handleLeaveOrg,
        })
    }

    const handleSave = () => {
        setLoading(true)

        updateOrg(
            {
                name,
            },
            {
                onSuccess: (data) => {
                    toast.success("Organization updated successfully")
                    queryClient.invalidateQueries({
                        queryKey: ["org", data.id],
                    })
                    queryClient.invalidateQueries({
                        queryKey: ["user", token],
                    })
                    modals.closeAll()
                },
                onError: (error) => {
                    toast.error(error.message)
                },
                onSettled: () => {
                    setLoading(false)
                },
            }
        )
    }
    return (
        <div>
            <Tabs variant="pills" orientation="vertical" defaultValue="general">
                <Tabs.List>
                    <Tabs.Tab
                        value="general"
                        leftSection={<IconInfoCircle size={18} />}
                    >
                        General
                    </Tabs.Tab>
                    <Tabs.Tab
                        value="members"
                        leftSection={<IconUsersGroup size={18} />}
                    >
                        Members
                    </Tabs.Tab>
                </Tabs.List>

                <Tabs.Panel value="general" px={28}>
                    <Title order={5} mb={16}>
                        General
                    </Title>
                    <div className="flex items-start mb-6">
                        <div className="flex gap-2 items-center">
                            <Text c={"gray"}>Org Name:</Text>
                            {!editNameMode ? (
                                <>
                                    <Text fw={600}>{name}</Text>

                                    {isCurrentOwner && (
                                        <UnstyledButton
                                            onClick={handleEditName}
                                        >
                                            <IconEdit color="blue" size={18} />
                                        </UnstyledButton>
                                    )}
                                </>
                            ) : (
                                <>
                                    <TextInput
                                        value={name}
                                        onChange={(e) =>
                                            setName(e.currentTarget.value)
                                        }
                                    />

                                    <UnstyledButton
                                        onClick={() => {
                                            setEditNameMode(false)
                                        }}
                                    >
                                        <IconCheck color="green" size={18} />
                                    </UnstyledButton>

                                    <UnstyledButton
                                        onClick={() => {
                                            setEditNameMode(false)
                                            setName(org?.name || "")
                                        }}
                                    >
                                        <IconX color="red" size={18} />
                                    </UnstyledButton>
                                </>
                            )}
                        </div>
                    </div>
                    <div>
                        <Title order={6} c={"orange"} mb={12}>
                            Danger zone
                        </Title>
                        {isCurrentOwner ? (
                            <Button
                                color="red"
                                onClick={handleOpenConfirmDelete}
                            >
                                Delete org
                            </Button>
                        ) : (
                            <Button
                                color="orange"
                                variant="outline"
                                onClick={handleOpenConfirmLeave}
                            >
                                Leave org
                            </Button>
                        )}
                    </div>
                </Tabs.Panel>

                <Tabs.Panel value="members" px={28}>
                    <Group mb={16} justify="space-between">
                        <Title order={5}>Members</Title>
                        {isCurrentOwner && (
                            <Button
                                size="xs"
                                variant="light"
                                onClick={() => {
                                    modals.open({
                                        id: "add-users",
                                        title: "Add users",
                                        size: "lg",
                                        children: <AddUserMenu />,
                                    })
                                }}
                            >
                                Add users
                            </Button>
                        )}
                    </Group>
                    <Table verticalSpacing="sm" highlightOnHover>
                        <Table.Thead>
                            <Table.Tr>
                                <Table.Th style={{ width: rem(40) }}></Table.Th>
                                <Table.Th>Name</Table.Th>
                                <Table.Th>Email</Table.Th>
                                <Table.Th>Role</Table.Th>
                                <Table.Th></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {org?.users?.map((user) => (
                                <UserRow key={user.id} user={user} />
                            ))}
                        </Table.Tbody>
                    </Table>
                </Tabs.Panel>
            </Tabs>
            <div className="flex items-center justify-end mt-5 gap-2">
                <Button
                    color="gray"
                    variant="outline"
                    onClick={modals.closeAll}
                >
                    Close
                </Button>
                {isCurrentOwner && (
                    <Button
                        color="green"
                        onClick={handleSave}
                        loading={loading}
                    >
                        Save
                    </Button>
                )}
            </div>
        </div>
    )
}

export default OrgSettings
