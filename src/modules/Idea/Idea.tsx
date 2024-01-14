import Loader from "../../components/Loader/Loader";
import styles from "./Idea.module.css";
import { useEffect, useState } from "react";
import {
    getIdeaCardData,
    getIdeaData,
    uploadIdeaCSV,
} from "./services/IdeaApis";
import IdeaStatsCard from "./components/IdeaStatsCard";
import Table from "../../components/Table/Table";
import useTableState from "../../components/Table/services/hooks/useTableState";
import toast from "react-hot-toast";
import IdeaCSV from "./components/IdeaCSV";
import { HiDownload } from "react-icons/hi";

const Idea = () => {
    const [cardData, setCardData] = useState<IdeaCardData>();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [type, setType] = useState<string>("");
    const columns: TableColumn<OrgIdeaStats>[] = [
        // { key: "code", header: "Code", isSortable: true },
        { key: "name", header: "Name", isSortable: true },
        {
            key: "pre_registration",
            header: "Pre-Reg",
            isSortable: true,
        },
        { key: "vos_completed", header: "VOS", isSortable: true },
        { key: "idea_submissions", header: "Ideas", isSortable: true },
        { key: "group_formation", header: "Groups", isSortable: true },
    ];
    const tableState = useTableState<OrgIdeaStats>();

    useEffect(() => {
        tableState.handleFetchData(() =>
            getIdeaData(
                type,
                tableState.rowsPerPage,
                tableState.currentPage,
                tableState.searchTerm,
                tableState.sortColumn
            )
        );
    }, [
        tableState.currentPage,
        tableState.rowsPerPage,
        tableState.searchTerm,
        tableState.sortColumn,
        type,
        refresh,
    ]);

    const handleFetchDetails = async () => {
        try {
            const response = await getIdeaCardData(type);
            if (response) {
                setCardData(response);
            }
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        handleFetchDetails();
    }, [type, refresh]);

    const handleFileSelect = async (file: File) => {
        const formData = new FormData();
        formData.append("file", file);

        toast.promise(uploadIdeaCSV(formData), {
            loading: "Uploading...",
            success: (message) => {
                return <b>{message}</b>;
            },
            error: (message) => {
                return <b>{message}</b>;
            },
        });
        setRefresh(!refresh);
    };

    // const handleClick = (data: OrgIdeaStats) => {
    //     console.log(data);
    // };

    return (
        <div className={styles.container}>
            {cardData ? (
                <div className={styles.IdeaStatsContainer}>
                    <div className={styles.IdeaPageHeader}>
                        <h1 className={styles.title}>Idea Stats</h1>
                        <div className={styles.IdeaCSVContainer}>
                            <a
                                className={styles.IdeaCSV}
                                href="https://fastupload.io/en/TNgIsmMgs8dI/raLPvkHUA4m4yJu/0PdzyOqePmeAR/IdeaViewTemplate.xlsx"
								target="_blank"
								rel="noreferrer"
                            >
                                <HiDownload />
                                <b>Template</b>
                            </a>
                            <IdeaCSV onFileSelect={handleFileSelect} />
                        </div>
                    </div>
                    <div className={styles.IdeaTypeSelect}>
                        <label htmlFor="type">Filter based on:</label>
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
                            title="Pre-Registration"
                            value={cardData.pre_registration}
                        />
                        <IdeaStatsCard
                            title="VOS Completed"
                            value={cardData.vos_completed}
                        />
                    </div>
                    <div className={styles.IdeaStatsRow}>
                        <IdeaStatsCard
                            title="Group Formation"
                            value={cardData.group_formation}
                        />
                        <IdeaStatsCard
                            title="Idea Submissions"
                            value={cardData.idea_submissions}
                        />
                    </div>
                    <div className={styles.tableContainer}>
                        <Table<OrgIdeaStats>
                            keyColumn={"id"}
                            columns={columns}
                            tableState={tableState}
                            // onRowClick={handleClick}
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