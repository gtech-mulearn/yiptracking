import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Profile from "./components/Profile";
import toast from "react-hot-toast";
import { getProfile } from "./services/DashboardApis";
const Dashboard = () => {
	const [refresh, setRefresh] = useState(false);
	const [data, setData] = useState<DashboardData>();
	const handleFetchDetails = async () => {
        try {
            const response: any = await getProfile();
			if (response) {
				setData(response);
			}
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        handleFetchDetails();
    }, [refresh]);
    return (
        <div className={styles.container}>
            <div className={styles.profile}>
                <Profile data={data} />
            </div>
            <div className={styles.dashboard}>
                <div className={styles.dashboardContainer}>
                    <h1>Colleges</h1>
                    <div className={styles.dashboardContents}>
                        <div>Colleges</div>
                        <div>Schools</div>
                    </div>
                </div>
                <div className={styles.dashboardContainer}>
                    <h1>Schools</h1>
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
