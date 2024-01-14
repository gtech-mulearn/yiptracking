import styles from "../Idea.module.css";
type Props = {
    title: string;
    value: number | string;
};

const IdeaStatsCard = ({ title, value }: Props) => {
    return (
        <div className={styles.IdeaStatsCard}>
            <div>
                <h3>{title}</h3>
                <h1>{value}</h1>
            </div>
        </div>
    );
};

export default IdeaStatsCard;
