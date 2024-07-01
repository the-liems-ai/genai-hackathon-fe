import { Button, Loader } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { useCurrentMindmap } from "@/stores/mindmap-store"
import { useSaveMindmap } from "../../../_api/hooks"
import toast from "react-hot-toast"
import { useTakeNote } from "@/stores/use-take-note"
import { useMindMapLoading } from "@/stores/mindmap-loading"
import { ExplainNode } from "@/types"

const HeaderSaveButton = () => {
    const navigate = useNavigate()
    const { mindmap } = useCurrentMindmap()
    const [notes] = useTakeNote()
    const [loading, loadingHandlers] = useMindMapLoading()

    const { mutate: saveMindmap } = useSaveMindmap()
    const handleSave = async () => {
        loadingHandlers.start()

        if (!mindmap) {
            toast.error("No mindmap found")
            loadingHandlers.stop()
            return
        }

        const allNotes: ExplainNode[] = [
            ...Object.values(mindmap.json_diagram.new.vertices).map(
                (vertex) => {
                    return {
                        node_id: vertex.id,
                        note: vertex.note,
                    }
                }
            ),
            ...notes,
        ]

        saveMindmap(
            {
                id: mindmap.ID,
                request: {
                    name: mindmap.name,
                    mermaid: mindmap.mermaid,
                    json_diagram: JSON.stringify(mindmap.json_diagram),
                    explain_node: JSON.stringify(allNotes),
                    image: mindmap.image,
                    summary: mindmap.summary,
                },
            },
            {
                onSuccess: () => {
                    toast.success("Mindmap saved successfully")
                    navigate("/mindmap")
                },
                onError: (error) => {
                    toast.error(error.message)
                },
                onSettled: () => {
                    loadingHandlers.stop()
                },
            }
        )
    }

    return (
        <Button color="green" onClick={handleSave} disabled={loading}>
            Save
        </Button>
    )
}

export default HeaderSaveButton
