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
                        // Add loading dots animation here using tailwindcss
                        <div className="flex space-x-1">
                            <div className="h-2 w-2 bg-gray-100 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                            <div className="h-2 w-2 bg-gray-100 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                            <div className="h-2 w-2 bg-gray-100 rounded-full animate-bounce delay-300"></div>
                        </div>
                    ) : (
                        <span className="text-white">
                            <ReactMarkdown>{message}</ReactMarkdown>
                        </span>
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
