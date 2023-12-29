import styles from "./NotFound.module.css";

const NotFound = () => {
    return (
        <div className={styles.container}>
            <div className={styles.notFound}>404</div>
			<h1>Page not found</h1>
        </div>
    );
};

export default NotFound;
