import styles from "../Dashboard.module.css";

type Props = {
    index: number;
    name: string;
    district: string;
    visited: boolean;
};

const OrgCard = (props: Props) => {
    return (
        <div className={styles.orgCard}>
            <div>{props.index}</div>
            <div>
                <h4>{props.name}</h4>
            </div>
            <div>
                <button
                    className={`${
                        props.visited ? styles.btnVisited : styles.btnPending
                    }`}
                >
                    {props.visited ? "Visited" : "Pending"}
                </button>
                <div
                    className={`${styles.statusDot} ${
                        props.visited ? styles.btnVisited : styles.btnPending
                    }`}
                ></div>
            </div>
        </div>
    );
};

export default OrgCard;
