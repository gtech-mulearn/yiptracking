import Loader from "../../components/Loader/Loader";
import styles from "./Idea.module.css";

const Idea = () => {
    return (
        <div className={styles.container}>
            <div>
                <h1>Coming Soon</h1>
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            </div>
        </div>
    );
};

export default Idea;
