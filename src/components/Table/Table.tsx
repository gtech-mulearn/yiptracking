import { useState, useMemo } from "react";
import styles from "./Table.module.css";
import Loader from "../Loader/Loader";

type Action<T> = {
    icon: React.ReactNode; // Can be a JSX element like an icon
    onClick: (item: T) => void; // Function to be called on click
    title: string;
};

type TableProps<T extends { [key: string]: any }> = {
    data: T[];
    columns: TableColumn<T>[];
    isLoading?: boolean;
    onRowClick?: (item: T) => void;
    actions?: Action<T>[]; // Optional actions array
};

const Table = <T extends { [key: string]: any }>({
    data,
    columns,
    onRowClick,
    isLoading,
    actions,
}: TableProps<T>) => {
    const [searchTerm, setSearchTerm] = useState("");
    const [sortKey, setSortKey] = useState("");
    const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

    const sortedData = useMemo(() => {
        let sorted = [...data];
        if (sortKey) {
            sorted.sort((a, b) => {
                const aValue = a[sortKey];
                const bValue = b[sortKey];
                if (typeof aValue === "string" && typeof bValue === "string") {
                    return (
                        aValue.localeCompare(bValue) *
                        (sortDirection === "asc" ? 1 : -1)
                    );
                }
                return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
            });
        }
        return sorted;
    }, [data, sortKey, sortDirection]);

    const filteredData = sortedData.filter((item) =>
        columns.some((column) => {
            const itemValue = item[column.key];
            return itemValue
                ?.toString()
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        })
    );

    const handleSort = (key: string) => {
        setSortDirection(
            sortKey === key && sortDirection === "asc" ? "desc" : "asc"
        );
        setSortKey(key);
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
                                        handleSort(column.key.toString())
                                    }
                                >
                                    {column.header}
                                </th>
                            ))}
                            {actions && <th>Actions</th>}
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((row) => (
                            <tr key={row.id} onClick={() => handleClick(row)}>
                                <td>{filteredData.indexOf(row) + 1}</td>
                                {columns.map((column) => (
                                    <td key={column.key.toString()}>
                                        {row[column.key]}
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
        </div>
    );
};

export default Table;