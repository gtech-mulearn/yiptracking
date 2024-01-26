import { useEffect, useState } from "react";
import styles from "./InternManagement.module.css";
import toast from "react-hot-toast";
import {
    addNewUser,
    assignOrg,
    deleteUser,
    deleteUserAssignments,
    getInterns,
} from "./services/InternManagementApis";
import Table from "../../components/Table/Table";
import CreateModal from "./components/CreateModal";
import { useNavigate } from "react-router-dom";
import { MdAssignmentAdd, MdPlaylistRemove } from "react-icons/md";
import { BiShow } from "react-icons/bi";
import useTableState from "../../components/Table/services/hooks/useTableState";
import { MdDeleteForever } from "react-icons/md";
import { IoMdPersonAdd } from "react-icons/io";
import AddUserModal from "./components/AddUserModal";
import ConfirmModal from "./components/ConfirmModal";
import { Roles } from "../../services/RoleChecker/Roles";

type confirmType = "none" | "delete" | "unassign";

const InternManagement = () => {
    const navigate = useNavigate();
    const [refresh, setRefresh] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isConfirmModalOpen, setIsConfirmModalOpen] =
        useState<confirmType>("none");
    const [user, setUser] = useState<InternData>();
    const columns: TableColumn<InternData>[] = [
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
        refresh,
    ]);

    const handleModalOpen = () => {
        setIsModalOpen(true);
    };

    const handleCreateModalOpen = () => {
        setIsCreateModalOpen(true);
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

    const handleAddUserSubmit = (data: AddNewUser) => {
        toast
            .promise(addNewUser(data), {
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
        navigate("/intern/" + data.email);
    };

    const handleDeleteUser = (data: InternData) => {
        const currentUserRole = localStorage.getItem("roles");
        if ((currentUserRole as string) === Roles.DC) {
            if (data.role === Roles.DC || data.role === Roles.ADMIN) {
                toast.error("You are not allowed to delete this user");
                return;
            } else {
                setUser(data);
                setIsConfirmModalOpen("delete");
            }
        } else {
            setUser(data);
            setIsConfirmModalOpen("delete");
        }
    };

    const handleConfirmSubmit = (data: confirmType) => {
        if (data === "delete") {
            toast.promise(deleteUser(user?.user_id as string), {
                loading: "Loading...",
                success: (message) => {
                    setRefresh(!refresh);
                    return <b>{message}</b>;
                },
                error: (message) => {
                    return <b>{message}</b>;
                },
            });
        } 
    };

    return (
        <div className={styles.container}>
            <div className={styles.tableContainer}>
                <div className={styles.header}>
                    <h1>Intern Management</h1>
                    <div>
                        <button onClick={handleCreateModalOpen}>
                            {" "}
                            <IoMdPersonAdd /> Create
                        </button>
                        <button onClick={handleModalOpen}>
                            {" "}
                            <MdAssignmentAdd /> Manage
                        </button>
                    </div>
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
                            color: "blue",
                        },
                        {
                            icon: <MdDeleteForever />,
                            onClick: (item) => {
                                handleDeleteUser(item);
                            },
                            title: "Delete User",
                            color: "red",
                            allowedRoles: [Roles.ADMIN, Roles.DC],
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
            {isCreateModalOpen && (
                <AddUserModal
                    isModalOpen={isCreateModalOpen}
                    handleModalClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleAddUserSubmit}
                />
            )}
            {isConfirmModalOpen !== "none" && (
                <ConfirmModal
                    type={isConfirmModalOpen}
                    user={user}
                    isModalOpen={
                        isConfirmModalOpen === "delete"
                            ? true
                            : false
                    }
                    handleModalClose={() => setIsConfirmModalOpen("none")}
                    onSubmit={handleConfirmSubmit}
                />
            )}
        </div>
    );
};

export default InternManagement;
