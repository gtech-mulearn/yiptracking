import { MdOutlineLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";
import { NavData } from "./services/NavData";
import { useNavigate } from "react-router-dom";

type Props = {};

const Sidebar = (_props: Props) => {
	const navigate = useNavigate()
    return (
        <div className={styles.sidebarContianer}>
            <div>
                <img
                    src="https://yip.kerala.gov.in/yipapp/img/yip3.png"
                    alt="YIP logo"
					width={200}
                />
            </div>
            <div className={styles.sidebarNav}>
                {NavData.map((item) => (
                    <div key={item.link} className={styles.navItem}>
                        <item.icon /> {item.title}
                    </div>
                ))}
            </div>
            <div className={styles.logout} onClick={() => {
				localStorage.removeItem("accessToken");
				localStorage.removeItem("refreshToken");
				navigate("/login");
			}}>
                <MdOutlineLogout />
                Logout
            </div>
        </div>
    );
};

export default Sidebar;
