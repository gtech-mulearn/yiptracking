import { useEffect, useState } from "react";
import styles from "./InternManagement.module.css";
import toast from "react-hot-toast";
import { assignOrg, getInterns } from "./services/InternManagementApis";
import Table from "../../components/Table/Table";
import CreateModal from "./components/CreateModal";
import { useNavigate } from "react-router-dom";
import { MdAssignmentAdd } from "react-icons/md";
import { BiShow } from "react-icons/bi";

const InternManagement = () => {
	const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState<InternData[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns: TableColumn<InternData>[] = [
        { key: "first_name", header: "First Name" },
        { key: "last_name", header: "Last Name" },
        { key: "role", header: "Role" },
        { key: "district_name", header: "District" },
        { key: "email", header: "Email" },
    ];

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleFetchDetails = async () => {
        try {
            const response: InternData[] = await getInterns();
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

    const handleSubmit = (data: CreateUser) => {
        const formattedOrgData = [
            ...(data.college ? data.college.map((option) => option.value) : []),
            ...(data.school ? data.school.map((option) => option.value) : []),
            ...(data.iti ? data.iti.map((option) => option.value) : []),
        ];
		toast
            .promise(assignOrg(data.email!, formattedOrgData), {
                loading: "Loading...",
                success: (message) => {
                    return <b>{message}</b>;
                },
                error: (message) => {
                    return <b>{message}</b>;
                },
            })
            .then(() => {
                setRefresh(!refresh);
            });
    };

	const handleClick = (data: InternData) => {
		navigate("/intern/" + data.email)
	}

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <h1>Intern Management</h1>
                    <button onClick={handleModalOpen}>
                        {" "}
                        <MdAssignmentAdd /> Manage
                    </button>
                </div>
                {data && (
                    <Table
                        data={data as InternData[]}
                        columns={columns}
                        onRowClick={handleClick}
                        isLoading={data.length === 0}
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
                )}
            </div>
            {isModalOpen && (
                <CreateModal
                    isModalOpen={isModalOpen}
                    handleModalClose={() => setIsModalOpen(false)}
                    onSubmit={handleSubmit}
                />
            )}
        </div>
    );
};

export default InternManagement;
