import { useEffect, useState } from "react";
import styles from "./InternManagement.module.css";
import toast from "react-hot-toast";
import { getInterns } from "./services/InternManagementApis";
import Table from "../../components/Table/Table";
import CreateModal from "./components/CreateModal";
import { BiPlusCircle } from "react-icons/bi";

const InternManagement = () => {
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState<InternsDataResponse>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIntern, setSelectedIntern] = useState<any>(null);
    const columns: TableColumn<InternData>[] = [
        { key: "first_name", header: "First Name" },
        { key: "last_name", header: "Last Name" },
        { key: "role", header: "Role" },
        { key: "email", header: "Email" },
        { key: "mobile", header: "Mobile" },
        { key: "district_name", header: "District" },
    ];

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleFetchDetails = async () => {
        try {
            const response: any = await getInterns();
            if (response) {
                setData(response);
            }
            console.log(response);
        } catch (error) {
            toast.error("Something went wrong, failed to load data");
        }
    };

    useEffect(() => {
        handleFetchDetails();
    }, [refresh]);
    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
            <div className={styles.header}>
                <h1>Intern Management</h1>
                <button onClick={handleModalOpen}>
                    {" "}
                    <BiPlusCircle /> Create
                </button>
            </div>
                {data?.data && (
                    <Table data={data.data as InternData[]} columns={columns} />
                )}
            </div>
            {isModalOpen && (
                <CreateModal
                    isModalOpen={isModalOpen}
                    handleModalClose={() => setIsModalOpen(false)}
                    onSubmit={(a) => console.log(a)}
                />
            )}
        </div>
    );
};

export default InternManagement;
