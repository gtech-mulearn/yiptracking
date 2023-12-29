import styles from "./Sidebar.module.css";
import { NavData } from "./services/NavData";

type Props = {};

const Sidebar = (_props: Props) => {
    return (
        <div className={styles.sidebarContianer}>
            <div>
                <h1>YIP</h1>
            </div>
            <div className={styles.sidebarNav}>
                {NavData.map((item) => (
                    <div key={item.link} className={styles.navItem}>
                        <item.icon /> {item.title}
                    </div>
                ))}
            </div>
            <div>Logout</div>
        </div>
    );
};

export default Sidebar;
