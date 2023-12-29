import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "../../components/Sidebar/Sidebar";
import styles from "./PrivateRoute.module.css";

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

    return (
	<div className={styles.container}>
		<Sidebar />
		<Outlet />
	</div>
	);
};