import styles from "../Table.module.css";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

type PaginationProps = {
    rowsPerPage: number;
    totalRows: number;
    currentPage: number;
    paginate: (pageNumber: number) => void;
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
};

const Pagination: React.FC<PaginationProps> = ({
    rowsPerPage,
    totalRows,
    onRowsPerPageChange,
}) => {
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalRows / rowsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <div className={styles.pagination}>
            <div className={styles.rowsPerPage}>
                <label htmlFor="rowsPerPage">Rows per page:</label>
                <select
                    id="rowsPerPage"
                    value={rowsPerPage}
                    onChange={onRowsPerPageChange}
                >
                    {[5, 10, 20, 50, 100].map((number) => (
                        <option key={number} value={number}>
                            {number}
                        </option>
                    ))}
                </select>
            </div>
            {/* <ul className={styles.pageNumbers}>
                {pageNumbers.map((number) => (
                    <li
                        key={number}
                        className={currentPage === number ? styles.active : ""}
                    >
                        <a onClick={() => paginate(number)} href="!#">
                            {number}
                        </a>
                    </li>
                ))}
            </ul> */}
        </div>
    );
};

export default Pagination;

type PaginationFooterProps = {
    currentPage: number;
    paginate: (pageNumber: number) => void;
    isNext: boolean;
};

export const PaginationFooter: React.FC<PaginationFooterProps> = ({
    currentPage,
    paginate,
    isNext,
}) => {
    return (
        <div className={styles.paginationFooter}>
            <div className={styles.pageButtonContainer}>
                <div
                    onClick={() => {
                        if (currentPage > 1) {
                            paginate(currentPage - 1);
                        }
                    }}
                    className={currentPage === 1 ? styles.disabled : ""}
                >
                    <FaAngleLeft />
                </div>
                <b>{currentPage}</b>
                <div
                    onClick={() => {
                        if (isNext) {
                            paginate(currentPage + 1);
                        }
                    }}
                    className={isNext ? "" : styles.disabled}
                >
                    <FaAngleRight />
                </div>
            </div>
        </div>
    );
};
