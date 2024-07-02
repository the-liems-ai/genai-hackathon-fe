import { ScrollArea, StyleProp } from "@mantine/core";
import { useElementSize } from "@mantine/hooks";
import { RichTextEditor } from "@mantine/tiptap";
import { Editor } from "@tiptap/react";

function TextEditor({
    editor,
    h,
}: {
    editor: Editor;
    h?: StyleProp<React.CSSProperties["height"]>;
}) {
    const { ref, height } = useElementSize();
    return (
        <RichTextEditor editor={editor} h={h}>
            <RichTextEditor.Toolbar sticky ref={ref}>
                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Bold />
                    <RichTextEditor.Italic />
                    <RichTextEditor.Underline />
                    <RichTextEditor.Strikethrough />
                    <RichTextEditor.ClearFormatting />
                    <RichTextEditor.Highlight />
                    <RichTextEditor.Code />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.H1 />
                    <RichTextEditor.H2 />
                    <RichTextEditor.H3 />
                    <RichTextEditor.H4 />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Blockquote />
                    <RichTextEditor.Hr />
                    <RichTextEditor.BulletList />
                    <RichTextEditor.OrderedList />
                    <RichTextEditor.Subscript />
                    <RichTextEditor.Superscript />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Link />
                    <RichTextEditor.Unlink />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.AlignLeft />
                    <RichTextEditor.AlignCenter />
                    <RichTextEditor.AlignJustify />
                    <RichTextEditor.AlignRight />
                </RichTextEditor.ControlsGroup>

                <RichTextEditor.ControlsGroup>
                    <RichTextEditor.Undo />
                    <RichTextEditor.Redo />
                </RichTextEditor.ControlsGroup>
            </RichTextEditor.Toolbar>

            <ScrollArea
                h={`calc(100% - ${height}px - 22px)`}
                className="overflow-hidden"
            >
                <RichTextEditor.Content />
            </ScrollArea>
        </RichTextEditor>
    );
}

export default TextEditor;