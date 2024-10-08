import { Button } from "@mantine/core"
import { useNavigate, useParams } from "react-router-dom"
import { useCurrentMindmap } from "@/stores/mindmap-store"
import { useSaveMindmap } from "../../../_api/hooks"
import toast from "react-hot-toast"
import { useTakeNote } from "@/stores/use-take-note"
import { useMindMapLoading } from "@/stores/mindmap-loading"
import { ExplainNode, JSONDiagram } from "@/types"
import { useReactFlow } from "reactflow"
import { convertEdgesToLinks, convertNodesToVertices } from "@/utils"
import { useMindmapThumbnail } from "@/hooks"

const HeaderSaveButton = () => {
    const navigate = useNavigate()
    const { mindmap } = useCurrentMindmap()
    const [notes] = useTakeNote()
    const [loading, loadingHandlers] = useMindMapLoading()
    const { getNodes, getEdges } = useReactFlow()
    const getThumbnail = useMindmapThumbnail()
    const { orgId } = useParams()

    const { mutate: saveMindmap } = useSaveMindmap()
    const handleSave = async () => {
        loadingHandlers.start()

        if (!mindmap) {
            toast.error("Failed to save mindmap")
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

        const newJSONDiagram: JSONDiagram = {
            old: mindmap.json_diagram.old,
            new: {
                vertices: convertNodesToVertices(getNodes()),
                links: convertEdgesToLinks(getEdges()),
                sub_graphs: {},
            },
        }

        saveMindmap(
            {
                id: mindmap.ID,
                request: {
                    name: mindmap.name,
                    mermaid: mindmap.mermaid,
                    json_diagram: JSON.stringify(newJSONDiagram),
                    explain_node: JSON.stringify(allNotes),
                    image: await getThumbnail(),
                    summary: mindmap.summary,
                },
            },
            {
                onSuccess: () => {
                    toast.success("Mindmap saved successfully")
                    navigate(`/${orgId}/mindmap`)
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
