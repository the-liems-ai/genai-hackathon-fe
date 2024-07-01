import { Outlet } from "react-router-dom"
import { Layout } from "./_components"
import { useCurrentMindmap } from "@/stores/mindmap-store"

const MindmapEditorLayout = () => {
    const { mindmap } = useCurrentMindmap()
    return (
        <Layout title={mindmap?.name}>
            <Outlet />
        </Layout>
    )
}

export default MindmapEditorLayout
