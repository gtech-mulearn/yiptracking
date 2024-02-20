import { useEffect, useState } from "react";
import styles from "./Dashboard.module.css";
import Profile from "./components/Profile";
import toast from "react-hot-toast";
import {
    getProfile,
    resetPassword,
    updateOrgStatus,
    updateProfile,
} from "./services/DashboardApis";
import OrgCard from "./components/OrgCard";
import DashboardModal from "./components/DashboardModal";
import { getAccessToken } from "../../services/ApiGateway/ApiGateway";
import ProfileEditModal from "./components/ProfileEditModal";
import { useParams } from "react-router-dom";
import Loader from "../../components/Loader/Loader";
const Dashboard = () => {
    const { id } = useParams();
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState<DashboardData>();
    const [modalState, setModalState] = useState<"org" | "profile" | null>(
        null
    );
    const [selectedOrg, setSelectedOrg] = useState<OrgData | null>(null);

    const handleFetchDetails = async () => {
        try {
            const response = await getProfile(id);
            if (response) {
                setData(response);
            }
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        if (getAccessToken()) {
            handleFetchDetails();
        }
    }, [refresh]);
    const handleEdit = () => {
        setModalState("profile");
    };

    const handleModalOpen = (org: OrgData) => {
        setSelectedOrg(org);
        setModalState("org");
    };

    const handleModalClose = () => {
        setModalState(null);
        setSelectedOrg(null);
    };

    const updateData = (data: OrgStatusData) => {
        toast
            .promise(updateOrgStatus(data), {
                loading: "Loading...",
                success: <b>Updated successfully</b>,
                error: (message) => {
                    return <b>{message}</b>;
                },
            })
            .then(() => {
                setRefresh(!refresh);
            });
    };
    const updateProfileData = (data: ProfileEditData) => {
        toast
            .promise(updateProfile(data), {
                loading: "Loading...",
                success: <b>Updated successfully</b>,
                error: (message) => {
                    return <b>{message}</b>;
                },
            })
            .then(() => {
                if (data.newPassword && data.currentPassword) {
                    toast.promise(resetPassword(data), {
                        loading: "Loading...",
                        success: <b>Password reset successfull</b>,
                        error: (message) => {
                            return <b>{message}</b>;
                        },
                    });
                }
            })
            .then(() => {
                setRefresh(!refresh);
            });
    };

    return !data ? (
        <div className={styles.loaderContainer}>
            <Loader />
        </div>
    ) : (
        <div className={styles.container}>
            <div className={styles.dashboard}>
                <div className={styles.dashboardContainer}>
                    <div className={styles.profile}>
                        <Profile data={data} handleEdit={handleEdit} />
                    </div>
                </div>
                {/* <div className={styles.dashboardContainer}>
                    <h2>ITIs</h2>
                    <div className={styles.dashboardContents}>
                        {data?.assigned.iti[0] ? (
                            data.assigned.iti.map(
                                (org: OrgData, index: number) => (
                                    <div key={index} title="ITI details">
                                        <OrgCard
                                            index={index + 1}
                                            name={org.title}
                                            district={org.district_name}
                                            visited={org.visited}
                                            id={org.org_id}
                                            userId={data.user_id}
                                            onClick={() => handleModalOpen(org)}
                                            refresh={refresh}
                                            setRefresh={setRefresh}
                                        />
                                    </div>
                                )
                            )
                        ) : (
                            <div>
                                <h3>No ITI Assigned</h3>
                            </div>
                        )}
                    </div>
                </div> */}
            </div>
            <div className={styles.dashboard}>
                <div className={styles.dashboardContainer}>
                    <h2>Schools</h2>
                    <div className={styles.dashboardContents}>
                        {data?.assigned.school[0] ? (
                            data.assigned.school.map(
                                (org: OrgData, index: number) => (
                                    <div key={index} title="School details">
                                        <OrgCard
                                            index={index + 1}
                                            name={org.title}
                                            district={org.district_name}
                                            visited={org.visited}
                                            id={org.org_id}
                                            userId={data.user_id}
                                            onClick={() => handleModalOpen(org)}
                                            refresh={refresh}
                                            setRefresh={setRefresh}
                                        />
                                    </div>
                                )
                            )
                        ) : (
                            <div>
                                <h3>No Schools Assigned</h3>
                            </div>
                        )}
                    </div>
                </div>
                <div className={styles.dashboardContainer}>
                    <h2>Colleges</h2>
                    <div className={styles.dashboardContents}>
                        {data?.assigned.college[0] ? (
                            data.assigned.college.map(
                                (org: OrgData, index: number) => (
                                    <div key={index} title="College details">
                                        <OrgCard
                                            index={index + 1}
                                            name={org.title}
                                            district={org.district_name}
                                            visited={org.visited}
                                            id={org.org_id}
                                            userId={data.user_id}
                                            onClick={() => handleModalOpen(org)}
                                            refresh={refresh}
                                            setRefresh={setRefresh}
                                        />
                                    </div>
                                )
                            )
                        ) : (
                            <div>
                                <h3>No Colleges Assigned</h3>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            {modalState === "org" && selectedOrg && (
                <DashboardModal
                    isModalOpen={modalState === "org"}
                    org={selectedOrg}
                    handleModalClose={handleModalClose}
                    updateData={updateData}
                />
            )}
            {modalState === "profile" && data && (
                <ProfileEditModal
                    isModalOpen={modalState === "profile"}
                    handleModalClose={handleModalClose}
                    updateData={updateProfileData}
                    currentData={{
                        mobile: data.mobile ?? "",
                        dob: data.dob ?? "",
                        gender: data.gender ?? "",
                        newPassword: "",
                        currentPassword: "",
                    }}
                />
            )}
        </div>
    );
};

export default Dashboard;
