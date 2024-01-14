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
import { Select, Tooltip } from "@radix-ui/themes";
import { FaFilter } from "react-icons/fa";
import { DistrictColumns, InternColumns, OrgColumns, ZoneColumns } from "./services/IdeaColumnData";
import { BiShow } from "react-icons/bi";

const Idea = () => {
    const [cardData, setCardData] = useState<IdeaCardData>();
    const [refresh, setRefresh] = useState<boolean>(false);
    const [type, setType] = useState<string>("organization");
    const [orgType, setOrgType] = useState<string>("total");
    const tableState = useTableState<OrgIdeaStats>();

    useEffect(() => {
        tableState.handleFetchData(() =>
            getIdeaData(
                type,
				orgType,
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
		orgType,
    ]);

    const handleFetchDetails = async () => {
        try {
            const response = await getIdeaCardData(orgType);
            if (response) {
                setCardData(response);
            }
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        handleFetchDetails();
    }, [type, refresh, orgType]);

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

	const handleTableColumns = (): TableColumn<OrgIdeaStats>[] => {
        if (type === "organization") {
            return OrgColumns;
        } else if (type === "intern") {
            return InternColumns;
		} else if (type === "district") {
			return DistrictColumns;
		} else {
			return ZoneColumns;
		}
    };

	function handleClick(item: OrgIdeaStats): void {
        let url: string = "/intern/";
        if (type === "organization") {
            url += item.assigned_to_email;
			// Open the URL in a new tab
			window.open(url, "_blank");
        } else if (type === "intern") {
			url += item.email;
			window.open(url, "_blank");
        }
    }

    return (
        <div className={styles.container}>
            {cardData ? (
                <div className={styles.IdeaStatsContainer}>
                    <div className={styles.IdeaPageHeader}>
                        <h1 className={styles.title}>Idea Stats</h1>
                        <div className={styles.IdeaCSVContainer}>
                            <Tooltip content="Download Excel template">
                                <a
                                    className={styles.IdeaCSV}
                                    href="https://fastupload.io/en/TNgIsmMgs8dI/raLPvkHUA4m4yJu/0PdzyOqePmeAR/IdeaViewTemplate.xlsx"
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    <HiDownload />
                                    <b>Template</b>
                                </a>
                            </Tooltip>
                            <IdeaCSV onFileSelect={handleFileSelect} />
                        </div>
                    </div>
                    <div className={styles.IdeaTypeSelect}>
                        <FaFilter />
                        <Select.Root
                            defaultValue="organization"
                            size={"3"}
                            value={type}
                            onValueChange={(e) => setType(e)}
                        >
                            <Select.Trigger
                                variant="soft"
                                className={styles.radixSelect}
                            />
                            <Select.Content position="popper">
                                <Select.Item value="organization">
                                    Organization
                                </Select.Item>
                                <Select.Item value="intern">Intern</Select.Item>
                                <Select.Item value="district">
                                    District
                                </Select.Item>
                                <Select.Item value="zone">Zone</Select.Item>
                            </Select.Content>
                        </Select.Root>
                        {type === "organization" && <Select.Root
                            defaultValue="total"
                            size={"3"}
                            value={orgType}
                            onValueChange={(e) => setOrgType(e)}
                        >
                            <Select.Trigger
                                variant="soft"
                                className={styles.radixSelect}
                            />
                            <Select.Content position="popper">
                                <Select.Item value="total">Total</Select.Item>
                                <Select.Item value="School">School</Select.Item>
                                <Select.Item value="College">
                                    College
                                </Select.Item>
                                <Select.Item value="Iti">ITI</Select.Item>
                            </Select.Content>
                        </Select.Root>}
                    </div>
                    <div className={styles.IdeaStatsWrapper}>
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
                    </div>
                    <div className={styles.tableContainer}>
                        <Table<OrgIdeaStats>
                            keyColumn={"id"}
                            columns={handleTableColumns()}
                            tableState={tableState}
                            onRowClick={handleClick}
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