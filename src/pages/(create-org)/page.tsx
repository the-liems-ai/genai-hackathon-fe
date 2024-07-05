import { useUser } from "@/api/hooks"
import { Button, Divider, Loader, TextInput } from "@mantine/core"
import { useEffect, useState } from "react"
import { useCreateOrg } from "./_api/hook"
import toast from "react-hot-toast"
import { useNavigate } from "react-router-dom"
import { getAuth, useAuth } from "@/stores/auth-store"

const CreateOrgPage = () => {
    const { data: user, isLoading, setUser } = useUser()
    const [orgName, setOrgName] = useState("")
    const [creating, setCreating] = useState(false)
    const { token, setToken } = useAuth()

    const { mutate: createOrg } = useCreateOrg()
    const navigate = useNavigate()

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [token])

    useEffect(() => {
        if (user && orgName.trim() === "") {
            setOrgName(`${user.name}'s Org`)
        }
    }, [user, isLoading])

    if (isLoading) {
        return (
            <div className="h-screen flex items-center justify-center bg-[url('/bg.png')] bg-center bg-no-repeat bg-cover">
                <div className="h-screen w-full flex items-center justify-center backdrop-blur-sm">
                    <Loader />
                </div>
            </div>
        )
    }

    const handleCreateOrg = () => {
        setCreating(true)
        createOrg(orgName, {
            onSuccess: (org) => {
                setUser({
                    ...user,
                    organizations: [
                        ...user.organizations,
                        {
                            id: org.id,
                            name: org.name,
                            is_owner: true,
                            created_at: new Date().toISOString(),
                            image: null,
                            metadata: null,
                        },
                    ],
                })
                toast.success("Organization created successfully")
                navigate(`/${org.id}/mindmap`)
            },
            onError: (error) => {
                toast.error(error.message)
            },
            onSettled: async () => {
                setCreating(false)
            },
        })
    }
    const handleChangeAccount = () => {
        setToken(null)
        navigate("/login")
    }

    return (
        <div className="h-screen flex items-center justify-center bg-[url('/bg.png')] bg-center bg-no-repeat bg-cover">
            <div className="h-screen w-full flex items-center justify-center backdrop-blur-sm">
                <div className="bg-white rounded-xl border-black/10 shadow px-10 py-8">
                    <div className="flex flex-col items-center justify-center gap-8">
                        <div className="flex flex-col items-center justify-center gap-4 w-[400px]">
                            <img
                                src="/fav.png"
                                alt="JS Logo"
                                className="aspect-square h-16"
                            />
                            <div className="flex flex-col items-center justify-center gap-1 mb-4">
                                <h1 className="font-bold text-lg">
                                    Create Organization
                                </h1>
                                <p className="text-black/60 text-sm">
                                    Create an organization to get started
                                </p>
                            </div>
                            <TextInput
                                size="md"
                                placeholder={"Organization name"}
                                w={"100%"}
                                value={orgName}
                                onChange={(e) =>
                                    setOrgName(e.currentTarget.value)
                                }
                                disabled={creating}
                            />
                            <Button
                                fullWidth
                                onClick={handleCreateOrg}
                                loading={creating}
                            >
                                Continue
                            </Button>
                            <Divider label="or" w={"100%"} />
                            <Button
                                variant="transparent"
                                py={0}
                                onClick={handleChangeAccount}
                            >
                                Change Account
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateOrgPage
