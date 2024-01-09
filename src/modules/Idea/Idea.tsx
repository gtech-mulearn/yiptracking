import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";
import styles from "./Idea.module.css";
import { useEffect, useState } from "react";
import { getIdeaData } from "./services/IdeaApis";
import IdeaStatsCard from "./components/IdeaStatsCard";
import Table from "../../components/Table/Table";

const Idea = () => {
    const [data, setData] = useState<IdeaData>();
    const [type, setType] = useState<string>("");
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
            const response = await getIdeaData(type);
            if (response) {
                setData(response);
            }
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        handleFetchDetails();
    }, [refresh, type]);

    // const handleClick = (data: OrgIdeaStats) => {
    //     console.log(data);
    // };

    function mergeOrg(data: IdeaData): OrgIdeaStats[] {
        return [...data.college, ...data.school, ...data.iti];
    }

    const tableData = () => {
        if (data) {
            if (type === "") {
                return mergeOrg(data);
            } else if (type === "School") {
                return data.school;
            } else if (type === "College") {
                return data.college;
            } else if (type === "Iti") {
                return data.iti;
            } else {
                return [];
            }
        }
    };

    return (
        <div className={styles.container}>
            {data ? (
                <div className={styles.IdeaStatsContainer}>
                    <h1 className={styles.title}>Idea Stats</h1>
                    <div className={styles.IdeaTypeSelect}>
                        <label htmlFor="type">Select Organization Type :</label>
                        <select
                            name="type"
                            id="type"
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value="">Total</option>
                            <option value="School">School</option>
                            <option value="College">College</option>
                            <option value="Iti">Iti</option>
                        </select>
                    </div>
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
                            data={tableData() as OrgIdeaStats[]}
                            columns={columns}
                            // onRowClick={handleClick}
                            isLoading={data ? false : true}
                            // actions={[
                            //     {
                            //         icon: <BiShow />,
                            //         onClick: (item) => {
                            //             handleClick(item);
                            //         },
                            //         title: "View Details",
                            //     },
                            // ]}
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