import { MdPlaylistRemove } from "react-icons/md";
import { RoleCheckerFunction } from "../../../services/RoleChecker/RoleChecker";
import styles from "../Dashboard.module.css";
import { Roles } from "../../../services/RoleChecker/Roles";
import toast from "react-hot-toast";
import { deleteUserAssignments } from "../../InternManagement/services/InternManagementApis";

type Props = {
    index: number;
    name: string;
    district: string;
    visited: boolean;
    id: string;
    userId: string;
    onClick: () => void;
    refresh: boolean;
    setRefresh: React.Dispatch<React.SetStateAction<boolean>>;
};

const OrgCard = (props: Props) => {
    function handleUnAssign(id: string, userId: string) {
        toast.promise(deleteUserAssignments(userId, id), {
            loading: "Loading...",
            success: (message) => {
                console.log(message);
                props.setRefresh(!props.refresh);
                return <b>Un-assigned {props.name} from user</b>;
            },
            error: (message) => {
                return <b>{message}</b>;
            },
        });
    }

    return (
        <div className={styles.orgCard}>
            <div onClick={props.onClick}>{props.index}</div>
            <div onClick={props.onClick}>
                <h4>{props.name}</h4>
            </div>
            <div className={styles.orgActions}>
                <button
                    className={`${
                        props.visited ? styles.btnVisited : styles.btnPending
                    }`}
                    onClick={props.onClick}
                >
                    {props.visited ? "Visited" : "Pending"}
                </button>
                <div
                    className={`${styles.statusDot} ${
                        props.visited ? styles.btnVisited : styles.btnPending
                    }`}
                    onClick={props.onClick}
                ></div>
                <div className={styles.actionIcon} title="Un-assign Org">
                    <RoleCheckerFunction roles={[Roles.ADMIN, Roles.DC]}>
                        <MdPlaylistRemove
                            onClick={() => {
                                console.log(
                                    handleUnAssign(props.id, props.userId)
                                );
                            }}
                        />
                    </RoleCheckerFunction>
                </div>
            </div>
        </div>
    );
};

export default OrgCard;
