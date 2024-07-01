import { Button, Group } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import HeaderSaveButton from "./header-save-button"

const HeaderRightSection = () => {
    const navigate = useNavigate()
    const handleCancel = () => {
        navigate("/mindmap")
    }
    return (
        <Group>
            <Button color="gray" variant="outline" onClick={handleCancel}>
                Cancel
            </Button>
            <HeaderSaveButton />
        </Group>
    )
}

export default HeaderRightSection
