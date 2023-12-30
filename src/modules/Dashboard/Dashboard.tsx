import styles from "./Dashboard.module.css";
import Profile from "./components/Profile";
const Dashboard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <Profile />
            </div>
            <div className={styles.dashboard}>
                <div
                    className={styles.dashboardContainer}
                >
                    <h1>Dashboard</h1>
                    <div className={styles.dashboardContents}>
                        <div>Colleges</div>
                        <div>Schools</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
