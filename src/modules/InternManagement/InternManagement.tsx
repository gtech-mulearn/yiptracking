import { useEffect, useState } from "react";
import styles from "./InternManagement.module.css";
import toast from "react-hot-toast";
import { assignOrg, getInterns } from "./services/InternManagementApis";
import Table from "../../components/Table/Table";
import CreateModal from "./components/CreateModal";
import { useNavigate } from "react-router-dom";
import { MdAssignmentAdd } from "react-icons/md";
import { BiShow } from "react-icons/bi";
	import useTableState from "../../components/Table/services/hooks/useTableState";

const InternManagement = () => {
	const navigate = useNavigate()
    const [refresh, setRefresh] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const columns: TableColumn<InternData>[]= [
        { key: "first_name", header: "First Name", isSortable: true },
        { key: "last_name", header: "Last Name", isSortable: true },
        { key: "role", header: "Role", isSortable: true },
        { key: "district_name", header: "District", isSortable: true },
        { key: "email", header: "Email", isSortable: true },
    ];

	const tableState = useTableState<InternData>();

    useEffect(() => {
        tableState.handleFetchData(() =>
            getInterns(
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
    ]);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

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
                <Table<InternData>
                    keyColumn="user_id"
                    columns={columns}
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
