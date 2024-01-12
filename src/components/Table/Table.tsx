import { useState, useEffect } from "react";
import styles from "./Table.module.css";
import Loader from "../Loader/Loader";
import { TbArrowsSort } from "react-icons/tb";
import Pagination from "./components/Pagination";
import { getTableData } from "./services/TableApis";

type Action<T> = {
    icon: React.ReactNode; // Can be a JSX element like an icon
    onClick: (item: T) => void; // Function to be called on click
    title: string;
};

type TableProps<T> = {
    columns: TableColumn<T>[];
    keyColumn: keyof T;
    apiEndpoint: string;
    onRowClick?: (item: T) => void;
    actions?: Action<T>[];
};

const Table = <T extends {}>({
    columns,
    keyColumn,
    onRowClick,
    actions,
    apiEndpoint,
}: TableProps<T>) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [totalRows, setTotalRows] = useState(0);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");

    // Function to fetch data
    const fetchData = async () => {
        setIsLoading(true);
        getTableData(
            apiEndpoint,
            rowsPerPage,
            currentPage,
            searchTerm,
            sortColumn
        )
            .then((response) => {
                setData(response.data);
                setTotalRows(response.pagination.count);
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Fetch data when dependencies change
    useEffect(() => {
        fetchData();
    }, [currentPage, rowsPerPage, searchTerm]);

    useEffect(() => {
        console.log(data); // This will log every time 'data' changes
    }, [data]);

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

    const handleRowsPerPageChange = (
        event: React.ChangeEvent<HTMLSelectElement>
    ) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1); // Reset to first page when rows per page changes
    };

    const handleClick = (item: T) => {
        if (onRowClick) {
            onRowClick(item);
        }
    };

    return isLoading ? (
        <div className={styles.loaderContainer}>
            <Loader />
        </div>
    ) : (
        <div className={styles.table}>
            <div className={styles.search}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>
            <section className={styles.tableBody}>
                <table>
                    <thead>
                        <tr>
                            <th>S/N</th>
                            {columns.map((column) => (
                                <th
                                    key={column.key.toString()}
                                    onClick={() =>
                                        setSortColumn(column.key.toString())
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
                        {data.map((row, index) => (
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
                                                (action, actionIndex) => (
                                                    <div
                                                        key={actionIndex}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            action.onClick(row);
                                                        }}
                                                        title={action.title}
                                                    >
                                                        {action.icon}
                                                    </div>
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
            <Pagination
                rowsPerPage={rowsPerPage}
                totalRows={totalRows}
                paginate={paginate}
                currentPage={currentPage}
                onRowsPerPageChange={handleRowsPerPageChange}
            />
        </div>
    );
};

export default Table;
