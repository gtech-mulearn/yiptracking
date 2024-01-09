import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import styles from "./Idea.module.css";
import { useEffect, useState } from "react";
import { getIdeaData } from "./services/IdeaApis";
import IdeaStatsCard from "./components/IdeaStatsCard";

const Idea = () => {
    const [data, setData] = useState<IdeaData>();
    const [refresh, _setRefresh] = useState(false);

    const handleFetchDetails = async () => {
        try {
            const response = await getIdeaData();
            if (response) {
                setData(response);
            }
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        handleFetchDetails();
    }, [refresh]);
    return (
        <div className={styles.container}>
            {data ? (
                <div className={styles.IdeaStatsContainer}>
					<h1 className={styles.title}>Idea Stats</h1>
					<div className={styles.IdeaStatsRow}>
						<IdeaStatsCard title="Group Formation" value={data.group_formation} />
						<IdeaStatsCard title="Idea Submissions" value={data.idea_submissions} />
					</div>
					<div className={styles.IdeaStatsRow}>
						<IdeaStatsCard title="Pre-Registration" value={data.pre_registration} />
						<IdeaStatsCard title="VOS Completed" value={data.vos_completed} />
					</div>
				</div>
            ) : (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            )}
        </div>
    );
};

export default Idea;
