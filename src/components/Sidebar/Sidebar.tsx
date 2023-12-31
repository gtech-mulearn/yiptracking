import { MdOutlineLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";
import { NavData } from "./services/NavData";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiCross, BiMenu, BiX } from "react-icons/bi";

type Props = {};

const Sidebar = (_props: Props) => {
    const navigate = useNavigate();
    const location = useLocation();
    const [ismobileMenuActive, setIsMobileMenuActive] = useState(false);

    useEffect(() => {
        console.log(location.pathname);
    });
    return (
        <>
            <div
                className={
                    styles.sidebarContianer +
                    " " +
                    (ismobileMenuActive ? styles.menuactive : "")
                }
            >
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
                                item.link === (location.pathname as string)
                                    ? styles.active
                                    : ""
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
            <div
                className={styles.hamburger}
                onClick={() => setIsMobileMenuActive(!ismobileMenuActive)}
            >
                {ismobileMenuActive ? <BiX size={40} /> : <BiMenu size={40} />}
            </div>
        </>
    );
};

export default Sidebar;
