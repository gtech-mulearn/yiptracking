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
                            src="https://th.bing.com/th/id/R.19fa7497013a87bd77f7adb96beaf768?rik=144XvMigWWj2bw&riu=http%3a%2f%2fwww.pngall.com%2fwp-content%2fuploads%2f5%2fUser-Profile-PNG-High-Quality-Image.png&ehk=%2bat%2brmqQuJrWL609bAlrUPYgzj%2b%2f7L1ErXRTN6ZyxR0%3d&risl=&pid=ImgRaw&r=0"
                            alt="profile picture"
                        />
                    </div>
                    <div className={styles.profileInfo}>
                        <h3>
                            {props.data?.first_name} {props.data?.last_name}
                        </h3>
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
                        {props.data?.district_name || "N/A"}
                    </h4>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>Zone: </span>
                        {props.data?.zone_name || "N/A"}
                    </h4>
                </div>
            </div>
        </div>
    );
};

export default Profile;