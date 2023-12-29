import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export const PrivateRoute = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        // Check if there's no access token.
        if (!accessToken) {
            navigate("/login");
            return;
        }
    }, [navigate]);

    return <Outlet />;
};