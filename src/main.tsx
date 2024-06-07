import React from "react"
import ReactDOM from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactFlowProvider } from "reactflow"
import { Toaster } from "react-hot-toast"
import { RouterProvider, createBrowserRouter } from "react-router-dom"
import "./styles/index.css"
import "reactflow/dist/style.css"
import "@mantine/core/styles.css"
import "@mantine/tiptap/styles.css"
import HomePage from "./pages/page"
import DiagramPage from "./pages/diagram/page"
import DiagramLayout from "./pages/diagram/layout"
import TestPage from "./pages/diagram/test/page"

const queryClient = new QueryClient()

const routers = createBrowserRouter([
    {
        path: "/",
        element: <HomePage />,
    },
    {
        path: "/diagram",
        element: <DiagramLayout />,
        children: [
            {
                index: true,
                element: <DiagramPage />,
            },
            {
                path: "test",
                element: <TestPage />,
            },
        ],
    },
])

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <MantineProvider>
                <ModalsProvider>
                    <ReactFlowProvider>
                        <RouterProvider router={routers} />
                        <Toaster />
                    </ReactFlowProvider>
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
