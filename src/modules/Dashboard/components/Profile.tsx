import styles from "../Dashboard.module.css";

const Profile = () => {
    return (
        <div className={`${styles.profileContainer} ${styles.neomorph}`}>
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
                        <h3>Jenin Joseph</h3>
                        <h4>YIP intern</h4>
                    </div>
                </div>
                <div className={styles.profileSection2}>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>Email: </span>
                        jenin8282@gmail.com
                    </h4>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>Mobile: </span>
                        8848687988
                    </h4>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>Gender: </span>
                        Male
                    </h4>
                    <h4 className={styles.blackText}>
                        <span className={styles.greyText}>Age: </span>
                        23
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
