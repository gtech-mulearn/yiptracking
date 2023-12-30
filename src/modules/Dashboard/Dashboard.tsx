import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Profile from "./components/Profile";
import toast from "react-hot-toast";
import { getProfile } from "./services/DashboardApis";
import OrgCard from "./components/OrgCard";
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
                    <h2>Colleges</h2>
                    <div className={styles.dashboardContents}>
                        {data?.assigned.college[0] ? (
                            data.assigned.college.map(
                                (org: OrgData, index: number) => (
                                    <OrgCard
                                        key={index}
                                        index={index + 1}
                                        name={org.title}
                                        district={org.district_name}
                                        visited={org.visited}
                                    />
                                )
                            )
                        ) : (
                            <div>
                                <h3>No Colleges Assigned</h3>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.dashboardContainer}>
                    <h2>Schools</h2>
                    <div className={styles.dashboardContents}>
                        {data?.assigned.school[0] ? (
                            data.assigned.school.map(
                                (org: OrgData, index: number) => (
                                    <OrgCard
                                        key={index}
                                        index={index + 1}
                                        name={org.title}
                                        district={org.district_name}
                                        visited={org.visited}
                                    />
                                )
                            )
                        ) : (
                            <div>
                                <h3>No Schools Assigned</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
