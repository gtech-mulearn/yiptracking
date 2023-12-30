import styles from "../Dashboard.module.css";
type Props = {
    data: DashboardData | undefined;
};

const Profile = (props: Props) => {
    return (
        <div className={styles.profileContainer}>
            <h1>Profile</h1>
            <div className={styles.profileContents}>
                <div className={styles.profileSection1}>
                    <div className={styles.profilePicture}>
                        <img
                            src="https://avatars.githubusercontent.com/u/84625875?v=4"
                            alt="profile picture"
                        />
                    </div>
                    <div className={styles.profileInfo}>
                        <h3>{props.data?.first_name} {props.data?.last_name}</h3>
                        <h4>{props.data?.role}</h4>
                    </div>
                </div>
                <div className={styles.profileSection2}>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>Email: </span>
                        {props.data?.email}
                    </h4>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>Mobile: </span>
                        {props.data?.mobile || "N/A"}
                    </h4>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>Gender: </span>
                        {props.data?.gender || "N/A"}
                    </h4>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>DOB: </span>
                        {props.data?.dob || "N/A"}
                    </h4>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>District: </span>
                        Ernakulam
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Profile;