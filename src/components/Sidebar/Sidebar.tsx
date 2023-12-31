import { MdOutlineLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";
import { NavData } from "./services/NavData";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";

type Props = {};

const Sidebar = (_props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        console.log(location.pathname);
    });
    return (
        <div className={styles.sidebarContianer}>
            <div>
                <img
                    src="https://yip.kerala.gov.in/wp-content/uploads/2022/10/logonew-1.png"
                    alt="YIP logo"
                    width={100}
                />
            </div>
            <div className={styles.sidebarNav}>
                {NavData.map((item) => (
                    <div
                        key={item.link}
						onClick={() => navigate(item.link)}
                        className={`${styles.navItem} ${
                            item.link === location.pathname as string ? styles.active : ""
                        }`}
                    >
                        <item.icon /> {item.title}
                    </div>
                ))}
            </div>
            <div
                className={styles.logout}
                onClick={() => {
                    localStorage.removeItem("accessToken");
                    localStorage.removeItem("refreshToken");
                    navigate("/login");
                }}
            >
                <MdOutlineLogout />
                Logout
            </div>
        </div>
    );
};

export default Sidebar;
