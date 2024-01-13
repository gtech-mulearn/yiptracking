import { useState, useCallback } from "react";

const useTableState = <T extends {}>(initialRowsPerPage = 10) => {
    const [data, setData] = useState<T[]>([]);;
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
    const [pagination, setPagination] = useState<Pagination>();
    const [searchTerm, setSearchTerm] = useState("");
    const [sortColumn, setSortColumn] = useState("");

    const handleFetchData = useCallback((fetchDataFunction: () => Promise<any>) => {
        setIsLoading(true);
        fetchDataFunction()
            .then((fetchedData) => {
                setData(fetchedData.data);
                setPagination(fetchedData.pagination);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);

    return {
        data,
        setData,
        isLoading,
        setIsLoading,
        currentPage,
        setCurrentPage,
        rowsPerPage,
        setRowsPerPage,
        pagination,
        setPagination,
        searchTerm,
        setSearchTerm,
        sortColumn,
        setSortColumn,
        handleFetchData,
    };
};

export default useTableState;