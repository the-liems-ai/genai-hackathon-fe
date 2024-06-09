import { Button } from "@mantine/core"
import { useNavigate } from "react-router-dom"

const HeaderSaveButton = () => {
    const navigate = useNavigate()

    const handleSave = () => {
        navigate("/mindmap")
    }
    return (
        <Button color="green" onClick={handleSave}>
            Save
        </Button>
    )
}

export default HeaderSaveButton
