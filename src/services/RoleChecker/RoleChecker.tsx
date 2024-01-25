import { ReactNode, useEffect, useState } from "react";
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

type RoleCheckerProps = {
    roles: string[];
    children: ReactNode;
};

export const RoleCheckerFunction: React.FC<RoleCheckerProps> = ({
    roles,
    children,
}) => {
    // Assuming you have a way to get the current user's roles
    if (roles) {
        const currentUserRoles = localStorage.getItem("roles") as string;

        const hasPermission = roles.some((role) =>
            currentUserRoles.includes(role)
        );

        if (!hasPermission) {
            // Render nothing or some fallback UI if the user doesn't have permission
            return null;
        }
    }

    return <>{children}</>;
};
