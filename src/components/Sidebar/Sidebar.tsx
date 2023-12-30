import { MdOutlineLogout } from "react-icons/md";
import styles from "./Sidebar.module.css";
import { NavData } from "./services/NavData";

type Props = {};

const Sidebar = (_props: Props) => {
    return (
        <div className={`${styles.sidebarContianer} ${styles.neomorph}`}>
            <div>
                <h2>YIP</h2>
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
