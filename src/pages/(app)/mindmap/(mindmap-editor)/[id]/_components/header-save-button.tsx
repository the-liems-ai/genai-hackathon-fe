import { Button } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import { useCurrentMindmap } from "@/stores/mindmap-store"
import { useMemo } from "react"

const HeaderSaveButton = () => {
    const navigate = useNavigate()
    const { mindmap } = useCurrentMindmap()

    const handleSave = async () => {
        navigate("/mindmap")
    }

    return (
        <Button color="green" onClick={handleSave}>
            Save
        </Button>
    )
}

export default HeaderSaveButton
