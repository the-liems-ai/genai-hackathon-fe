import LoadingDots from "@/components/ui/loading-dots"
import { parseMarkdownToHTML } from "@/utils"
import ReactMarkdown from "react-markdown"

export interface Message {
    role: string
    message: string
}

const ChatUi = ({ role, message }: Message) => {
    if (role === "bot") {
        return (
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img alt="Bot avatar" src="/bot-avt.webp" />
                    </div>
                </div>
                <div className="chat-header">Chatbot</div>
                <div className="chat-bubble chat-bubble-info flex items-center bg-[#228be6]">
                    {message === "l" ? (
                        <LoadingDots />
                    ) : (
                        <div
                            dangerouslySetInnerHTML={{
                                __html: parseMarkdownToHTML(message),
                            }}
                            className="text-white text-justify w-full"
                        />
                    )}
                </div>
            </div>
        )
    } else {
        return (
            <div className="chat chat-end pr-4">
                <div className="chat-header">You</div>
                <div className="chat-bubble chat-bubble-info bg-[#228be6] text-white">
                    {message}
                </div>
            </div>
        )
    }
}

export default ChatUi
