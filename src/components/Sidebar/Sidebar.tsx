import { MdOutlineLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";
import { NavData } from "./services/NavData";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { BiMenu, BiX } from "react-icons/bi";
import yip from "../../assets/YIP Logo.png";

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
                        src={yip}
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
