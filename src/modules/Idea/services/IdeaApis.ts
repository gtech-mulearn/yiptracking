import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import { dynamicRoute, yipRoutes } from "../../../services/ApiGateway/Endpoints";

export const getIdeaData = async (
    type: string,
    rowsPerPage: number,
    currentPage: number,
    searchTerm: string,
    sortColumn: string
) => {
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getOrg),
            {
                params: {
                    org_type: type,
                    perPage: rowsPerPage,
                    pageIndex: currentPage,
                    search: searchTerm,
                    sort: sortColumn,
                },
            }
        );
        return response.data.response;
    } catch (error) {
        throw error;
    }
};

export const getIdeaCardData = async (type: string) => {
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getIdeaData),
            {
                params: {
                    org_type: type,
                },
            }
        );
		console.log(response.data.response);
        return response.data.response;
    } catch (error) {
        throw error;
    }
};