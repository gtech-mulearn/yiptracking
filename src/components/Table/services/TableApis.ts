import toast from "react-hot-toast";
import { privateGateway } from "../../../services/ApiGateway/ApiGateway";

export const getTableData = async (
    apiEndpoint: string,
    rowsPerPage: number,
    currentPage: number,
    searchTerm: string,
	sortColumn: string
) => {
    try {
        const response = await privateGateway.get(apiEndpoint, {
            params: {
                perPage: rowsPerPage,
                pageIndex: currentPage,
                search: searchTerm,
				sort: sortColumn
            },
        });
		return response.data.response;
    } catch (error) {
        console.error("Error fetching data:", error);
        toast.error("Something went wrong, failed to load data");
    }
};