import styles from "./Table.module.css";
import Loader from "../Loader/Loader";
import { TbArrowsSort } from "react-icons/tb";
import Pagination, { PaginationFooter } from "./components/Pagination";
import { useState } from "react";
import { RoleCheckerFunction } from "../../services/RoleChecker/RoleChecker";

type Action<T> = {
    icon: React.ReactNode; // Can be a JSX element like an icon
    onClick: (item: T) => void; // Function to be called on click
    title: string;
    color?: string;
	allowedRoles?: string[];
};

type TableProps<T> = {
    columns: TableColumn<T>[];
    keyColumn: keyof T;
    tableState: UseTableStateProps<T>;
    onRowClick?: (item: T) => void;
    actions?: Action<T>[];
};

const Table = <T extends {}>({
    columns,
    keyColumn,
    tableState,
    onRowClick,
    actions,
}: TableProps<T> & { tableState: UseTableStateProps<T> }) => {
    const paginate = (pageNumber: number) => {
        tableState.setCurrentPage(pageNumber);
    };

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        tableState.setRowsPerPage(parseInt(event.target.value, 10));
        tableState.setCurrentPage(1); // Reset to first page when rows per page changes
    };

    const handleClick = (item: T) => {
        if (onRowClick) {
            onRowClick(item);
        }
    };

    const [sortState, setSortState] = useState({
        column: "",
        direction: "asc", // 'asc' or 'desc'
    });

    const handleSortClick = (columnKey: string) => {
        let newDirection = "asc";
        if (sortState.column === columnKey && sortState.direction === "asc") {
            newDirection = "desc";
        }
        setSortState({ column: columnKey, direction: newDirection });
        const sortKey = newDirection === "desc" ? `-${columnKey}` : columnKey;
		tableState.setSortColumn(sortKey)
    };

    return (
        <>
            <div className={styles.tableHeader}>
                <div className={styles.search}>
                    <input
                        type="text"
                        placeholder="Search..."
                        value={tableState.searchTerm}
                        onChange={(e) =>
                            tableState.setSearchTerm(e.target.value)
                        }
                    />
                </div>
                <div>
                    <Pagination
                        rowsPerPage={tableState.rowsPerPage}
                        totalRows={tableState.pagination?.totalPages || 0}
                        paginate={paginate}
                        currentPage={tableState.currentPage}
                        onRowsPerPageChange={handleRowsPerPageChange}
                    />
                </div>
            </div>
            {tableState.isLoading ? (
                <div className={styles.loaderContainer}>
                    <Loader />
                </div>
            ) : (
                <div className={styles.table}>
                    <section className={styles.tableBody}>
                        <table>
                            <thead>
                                <tr>
                                    <th>S/N</th>
                                    {columns.map((column) => (
                                        <th
                                            key={column.key.toString()}
                                            onClick={() =>
                                                handleSortClick(
                                                    column.key.toString()
                                                )
                                            }
                                        >
                                            <div>
                                                {column.header}{" "}
                                                {column.isSortable && (
                                                    <span>
                                                        <TbArrowsSort />
                                                    </span>
                                                )}
                                            </div>
                                        </th>
                                    ))}
                                    {actions && <th>Actions</th>}
                                </tr>
                            </thead>
                            <tbody>
                                {tableState.data.map((row, index) => (
                                    <tr
                                        key={String(row[keyColumn])}
                                        onClick={() => handleClick(row)}
                                    >
                                        <td>{index + 1}</td>
                                        {columns.map((column) => (
                                            <td key={column.key.toString()}>
                                                {String(row[column.key])}
                                            </td>
                                        ))}
                                        {actions && (
                                            <td>
                                                <div className={styles.action}>
                                                    {actions.map(
                                                        (
                                                            action,
                                                            actionIndex
                                                        ) => (
                                                            <RoleCheckerFunction
                                                                roles={
                                                                    action.allowedRoles!
                                                                }
                                                            >
                                                                <div
                                                                    style={{
                                                                        color:
                                                                            action.color ||
                                                                            "black",
                                                                    }}
                                                                    key={
                                                                        actionIndex
                                                                    }
                                                                    onClick={(
                                                                        e
                                                                    ) => {
                                                                        e.stopPropagation();
                                                                        action.onClick(
                                                                            row
                                                                        );
                                                                    }}
                                                                    title={
                                                                        action.title
                                                                    }
                                                                >
                                                                    {
                                                                        action.icon
                                                                    }
                                                                </div>
                                                            </RoleCheckerFunction>
                                                        )
                                                    )}
                                                </div>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </section>
                </div>
            )}
            <PaginationFooter
                currentPage={tableState.currentPage}
                paginate={paginate}
                isNext={tableState.pagination?.isNext || false}
            />
        </>
    );
};

export default Table;
