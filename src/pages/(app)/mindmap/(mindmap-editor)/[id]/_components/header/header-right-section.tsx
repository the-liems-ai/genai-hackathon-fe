import { Button, Group } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import HeaderSaveButton from "./header-save-button"
import { modals } from "@mantine/modals"

const HeaderRightSection = () => {
    const navigate = useNavigate()
    const handleCancel = () => {
        modals.openConfirmModal({
            centered: true,
            title: "Are you sure?",
            children:
                "All unsaved changes will be lost. Are you sure you want to cancel?",
            onConfirm: () => {
                navigate("/mindmap")
            },
            labels: {
                cancel: "No",
                confirm: "Yes",
            },
            confirmProps: { color: "green" },
        })
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
