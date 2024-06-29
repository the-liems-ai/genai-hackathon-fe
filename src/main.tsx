import React from "react"
import ReactDOM from "react-dom/client"
import { MantineProvider } from "@mantine/core"
import { ModalsProvider } from "@mantine/modals"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ReactFlowProvider } from "reactflow"
import { Toaster } from "react-hot-toast"
import { Outlet, RouterProvider, createBrowserRouter } from "react-router-dom"
import "./styles/index.css"
import "reactflow/dist/style.css"
import "@mantine/core/styles.css"
import "@mantine/tiptap/styles.css"
import HomePage from "./pages/(marketing)/page"
import MindmapEditorPage from "./pages/(app)/mindmap/(mindmap-editor)/[id]/page"
import MindmapLayout from "./pages/(app)/mindmap/(mindmap)/layout"
import MindmapPage from "./pages/(app)/mindmap/(mindmap)/page"
import DrawerUI from "./components/drawer"
import NotFoundPage from "./pages/404/page"
import NewMindmapPage from "./pages/(app)/mindmap/(mindmap-editor)/new/page"
import MindmapEditorLayout from "./pages/(app)/mindmap/(mindmap-editor)/[id]/layout"

const queryClient = new QueryClient()

const routers = createBrowserRouter([
    {
        path: "/",
        element: <Outlet />,
        errorElement: <NotFoundPage />,
        children: [
            {
                path: "",
                element: <HomePage />,
            },
            {
                path: "mindmap",
                element: <Outlet />,
                children: [
                    {
                        path: "",
                        element: <MindmapLayout />,
                        children: [
                            {
                                index: true,
                                element: <MindmapPage />,
                            },
                        ],
                    },
                    {
                        path: ":id",
                        element: <MindmapEditorLayout />,
                        children: [
                            {
                                index: true,
                                element: <MindmapEditorPage />,
                            },
                        ],
                    },
                    {
                        path: "new",
                        element: <NewMindmapPage />,
                    },
                ],
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
                        <DrawerUI />
                    </ReactFlowProvider>
                </ModalsProvider>
            </MantineProvider>
        </QueryClientProvider>
    </React.StrictMode>
)
