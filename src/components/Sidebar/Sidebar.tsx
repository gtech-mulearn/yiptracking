import { MdOutlineLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";
import { NavData } from "./services/NavData";

type Props = {};

const Sidebar = (_props: Props) => {
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
            <div className={styles.logout}>
                <MdOutlineLogout />
                Logout
            </div>
        </div>
    );
};

export default Sidebar;
