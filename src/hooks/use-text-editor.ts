import { Link } from "@mantine/tiptap"
import Highlight from "@tiptap/extension-highlight"
import Subscript from "@tiptap/extension-subscript"
import Superscript from "@tiptap/extension-superscript"
import TextAlign from "@tiptap/extension-text-align"
import Underline from "@tiptap/extension-underline"
import { useEditor } from "@tiptap/react"
import StarterKit from "@tiptap/starter-kit"
import { useState } from "react"

const useTextEditor = (defaultValue?: string) => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Underline,
            Link,
            Superscript,
            Subscript,
            Highlight,
            TextAlign.configure({ types: ["heading", "paragraph"] }),
        ],
        content: defaultValue || "",
    })

    const content = editor?.getHTML() || null

    const setContent = (content: string) => {
        if (editor) {
            editor.commands.setContent(content)
        }
    }

    return {
        editor,
        content,
        setContent,
    }
}

export default useTextEditor
