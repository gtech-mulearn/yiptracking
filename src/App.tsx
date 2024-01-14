import { RouterProvider, createBrowserRouter } from "react-router-dom";
import "./App.css";
import { PrivateRoute } from "./services/PrivateRoute/PrivateRoute";
import { Toaster } from "react-hot-toast";
import NotFound from "./modules/NotFound/NotFound";
import Login from "./modules/Login";
import Dashboard from "./modules/Dashboard/Dashboard";
import InternManagement from "./modules/InternManagement/InternManagement";
import Idea from "./modules/Idea/Idea";
import { RoleChecker } from "./services/RoleChecker/RoleChecker";
import { Roles } from "./services/RoleChecker/Roles";
import "@radix-ui/themes/styles.css";
import { Theme } from "@radix-ui/themes";

function App() {
    const router = createBrowserRouter([
        {
            path: "*",
            element: <NotFound />,
        },
        {
            path: "/404",
            element: <NotFound />,
        },
        {
            path: "/login",
            element: <Login />,
        },
        {
            path: "/",
            element: <PrivateRoute />,
            children: [
                {
                    path: "/",
                    element: <Dashboard />,
                },

                {
                    path: "/",
                    element: (
                        <RoleChecker allowedRoles={[Roles.ADMIN, Roles.DC]} />
                    ),
                    children: [
                        {
                            path: "intern",
                            element: <InternManagement />,
                        },
                        {
                            path: "intern/:id",
                            element: <Dashboard />,
                        },
                        {
                            path: "idea",
                            element: <Idea />,
                        },
                    ],
                },
            ],
        },
    ]);
    return (
        <>
            <Theme hasBackground={false}>
                <Toaster position="bottom-center" reverseOrder={false} />
                <RouterProvider router={router} />
            </Theme>
        </>
    );
}

export default App;
