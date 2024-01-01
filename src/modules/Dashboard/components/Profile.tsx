import styles from "../Dashboard.module.css";
import { MdEdit } from "react-icons/md";
import pic from "../../../assets/default.png";

type Props = {
    data: DashboardData | undefined;
    handleEdit: () => void;
};

const Profile = (props: Props) => {
    return (
        <div className={styles.profileContainer}>
            <h1>Profile</h1>
            <div className={styles.profileContents}>
                <div className={styles.profileSection1}>
                    <div className={styles.profilePicture}>
                        <img
                            src={pic}
                            alt="profile picture"
                        />
                        <div
                            className={styles.editBtn}
                            onClick={props.handleEdit}
                            title="Edit"
                        >
                            <MdEdit />
                        </div>
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
