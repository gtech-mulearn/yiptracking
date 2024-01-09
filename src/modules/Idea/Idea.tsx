import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import styles from "./Idea.module.css";
import { useEffect, useState } from "react";
import { getIdeaData } from "./services/IdeaApis";
import IdeaStatsCard from "./components/IdeaStatsCard";
import Table from "../../components/Table/Table";
import { BiShow } from "react-icons/bi";

const Idea = () => {
    const [data, setData] = useState<IdeaData>();
    const [refresh, _setRefresh] = useState(false);
    const columns: TableColumn<OrgIdeaStats>[] = [
        { key: "code", header: "Code", isSortable: true },
        { key: "name", header: "Name", isSortable: true },
        {
            key: "pre_registration",
            header: "Pre-Registration",
            isSortable: true,
        },
        { key: "vos_completed", header: "VOS", isSortable: true },
        { key: "idea_submissions", header: "Ideas", isSortable: true },
        { key: "group_formation", header: "Groups", isSortable: true },
    ];

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

    const handleClick = (data: OrgIdeaStats) => {
        console.log(data);
    };

    return (
        <div className={styles.container}>
            {data ? (
                <div className={styles.IdeaStatsContainer}>
                    <h1 className={styles.title}>Idea Stats</h1>
                    <div className={styles.IdeaStatsRow}>
                        <IdeaStatsCard
                            title="Group Formation"
                            value={data.group_formation}
                        />
                        <IdeaStatsCard
                            title="Idea Submissions"
                            value={data.idea_submissions}
                        />
                    </div>
                    <div className={styles.IdeaStatsRow}>
                        <IdeaStatsCard
                            title="Pre-Registration"
                            value={data.pre_registration}
                        />
                        <IdeaStatsCard
                            title="VOS Completed"
                            value={data.vos_completed}
                        />
                    </div>
                    <div className={styles.tableContainer}>
                        <Table
                            data={data.school as OrgIdeaStats[]}
                            columns={columns}
                            onRowClick={handleClick}
                            isLoading={data ? false : true}
                            actions={[
                                {
                                    icon: <BiShow />,
                                    onClick: (item) => {
                                        handleClick(item);
                                    },
                                    title: "View Details",
                                },
                            ]}
                        />
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
