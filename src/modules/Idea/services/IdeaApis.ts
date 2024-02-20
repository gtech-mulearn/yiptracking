import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import {
    dynamicRoute,
    yipRoutes,
} from "../../../services/ApiGateway/Endpoints";

export const getIdeaData = async (
    type: string,
    org_type: string,
    rowsPerPage: number,
    currentPage: number,
    searchTerm: string,
    sortColumn: string
) => {
    const orgType = org_type === "total" ? "" : org_type;
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getIdeaTableData),
            {
                params: {
                    type: type,
                    org_type: orgType,
                    perPage: rowsPerPage,
                    pageIndex: currentPage,
                    search: searchTerm,
                    sort: sortColumn,
                    is_pagination: true,
                },
            }
        );
        return response.data.response;
    } catch (error) {
        throw error;
    }
};

export const getIdeaCardData = async (type: string) => {
    const orgType = type === "total" ? "" : type;
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getIdeaData),
            {
                params: {
                    org_type: orgType,
                },
            }
        );
        return response.data.response;
    } catch (error) {
        throw error;
    }
};

export const uploadIdeaCSV = async (formData: FormData) => {
    try {
        const response = await privateGateway.post(
            dynamicRoute(yipRoutes.uploadIdeaCSV),
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );
        // Handle response...
        return response.data.message.general[0];
    } catch (error: any) {
        throw error.response.data.message.general[0];
    }
};

export const getIdeaDataCsv = async (
    type: string,
    org_type: string,
    rowsPerPage: number,
    currentPage: number,
    searchTerm: string,
    sortColumn: string,
    csv: boolean
) => {
    console.log(org_type);
    const orgType = org_type === "total" ? "" : org_type;
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getIdeaTableData),
            {
                params: {
                    type: type,
                    org_type: orgType,
                    perPage: rowsPerPage,
                    pageIndex: currentPage,
                    search: searchTerm,
                    sort: sortColumn,
                    is_pagination: true,
                    csv: csv,
                },
            }
        );
        return response.data as string;
    } catch (error) {
        throw error;
    }
};
