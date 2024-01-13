interface TableColumn<T> {
    key: keyof T;
    header: string;
	isSortable?: boolean;
}

interface Pagination {
    count: number;
    totalPages: number;
    isNext: boolean;
    isPrev: boolean;
    nextPage: number;
}

interface UseTableStateProps<T> {
    data: T[];
    setData: React.Dispatch<React.SetStateAction<T[]>>;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    rowsPerPage: number;
    setRowsPerPage: React.Dispatch<React.SetStateAction<number>>;
    pagination: Pagination | undefined;
    setPagination: React.Dispatch<React.SetStateAction<Pagination | undefined>>;
    searchTerm: string;
    setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
    sortColumn: string;
    setSortColumn: React.Dispatch<React.SetStateAction<string>>;
    handleFetchData: (fetchDataFunction: () => Promise<any>) => void; // You may need to adjust the type for fetchDataFunction
}