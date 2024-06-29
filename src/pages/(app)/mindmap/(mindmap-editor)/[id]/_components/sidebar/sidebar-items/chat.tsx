import {
    ActionIcon,
    AppShell,
    Group,
    Loader,
    ScrollArea,
    Textarea,
} from "@mantine/core"
import { useListState } from "@mantine/hooks"
import { IconSend } from "@tabler/icons-react"
import { useRef, useState } from "react"
import ReactMarkdown from "react-markdown"

interface Message {
    role: string
    message: string
}

const Chat = () => {
    const chatSectionViewport = useRef<HTMLDivElement>(null)

    const scrollBottom = () => {
        setTimeout(() => {
            chatSectionViewport.current!.scrollTo({
                top: chatSectionViewport.current!.scrollHeight,
                behavior: "smooth",
            })
        }, 100)
    }

    const [conversation, conversationHandler] = useListState<Message>([
        { role: "bot", message: "Hi, how can I help you?" },
    ])

    const [chat, setChat] = useState<string>("")

    const handleChat = () => {}

    return (
        <>
            <AppShell.Section
                grow
                component={ScrollArea}
                py={16}
                viewportRef={chatSectionViewport}
            >
                {conversation.map((message, index) => (
                    <ChatUi key={index} {...message} />
                ))}
            </AppShell.Section>
            <AppShell.Section>
                <Group pt={16} align="end">
                    <Textarea
                        className="grow"
                        placeholder="Chat with AI here"
                        autosize
                        minRows={1}
                        maxRows={10}
                        onChange={(e) => setChat(e.currentTarget.value)}
                        value={chat}
                        // disabled={}
                        onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                                e.preventDefault()
                                handleChat()
                            }
                        }}
                    />
                    <ActionIcon
                        aria-label="Send message"
                        size="lg"
                        // disabled={}
                        onClick={handleChat}
                    >
                        {/* {messaging ? (
                            <Loader size="sm" />
                        ) : ( */}
                        <IconSend size={20} />
                        {/* )} */}
                    </ActionIcon>
                </Group>
            </AppShell.Section>
        </>
    )
}

const ChatUi = ({ role, message }: Message) => {
    if (role === "bot") {
        return (
            <div className="chat chat-start">
                <div className="chat-image avatar">
                    <div className="w-10 rounded-full">
                        <img
                            alt="Bot avatar"
                            src="https://www.shutterstock.com/image-vector/chatbot-robo-advisor-adviser-chat-600nw-1222464061.jpg"
                        />
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

export default Chat
