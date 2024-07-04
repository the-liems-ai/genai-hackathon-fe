import { Button, Group } from "@mantine/core"
import { useNavigate } from "react-router-dom"
import HeaderSaveButton from "./header-save-button"
import { modals } from "@mantine/modals"
import { useMindMapLoading } from "@/stores/mindmap-loading"

const HeaderRightSection = () => {
    const navigate = useNavigate()
    const [loading] = useMindMapLoading()
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
                cancel: "Continue editing",
                confirm: "Cancel and discard",
            },
            confirmProps: { color: "red" },
        })
    }
    return (
        <Group>
            <Button
                color="gray"
                variant="outline"
                onClick={handleCancel}
                disabled={loading}
            >
                Cancel
            </Button>
            <HeaderSaveButton />
        </Group>
    )
}

export default HeaderRightSection
