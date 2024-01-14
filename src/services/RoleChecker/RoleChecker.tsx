import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";

type Props = {
    allowedRoles: string[];
};

export const RoleChecker = ({ allowedRoles }: Props) => {
    const navigate = useNavigate();
    const [isAuthorized, setIsAuthorized] = useState(false);

    useEffect(() => {
        const userRoles = localStorage.getItem("roles");

        if (!allowedRoles.includes(userRoles as string)) {
            if (window.location.pathname !== "/") {
                navigate("/");
                toast.error("You don't have permission to access this page");
            }
        } else {
            setIsAuthorized(true);
        }
    }, [navigate, allowedRoles]);

    if (!isAuthorized) {
        // Optionally, you can render a loading spinner or a blank page here
        return null; // or <LoadingSpinner />;
    }

    return <Outlet />;
};