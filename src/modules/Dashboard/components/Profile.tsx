import styles from "../Dashboard.module.css";
type Props = {};

const Profile = (_props: Props) => {
    return (
        <div className={styles.profileContainer}>
            <h1>Profile</h1>
            <div className={styles.profileContents}>
                <div>Test</div>
                <div>Test2</div>
            </div>
        </div>
    );
};

export default Profile;
