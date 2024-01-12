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