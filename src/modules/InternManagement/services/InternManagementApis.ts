import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import {
	dynamicRoute,
    yipRoutes,
} from "../../../services/ApiGateway/Endpoints";

export const getInterns = async (
    rowsPerPage: number,
    currentPage: number,
    searchTerm: string,
    sortColumn: string
) => {
    const response = await privateGateway.get(
        dynamicRoute(yipRoutes.getInterns), {
			params: {
				perPage: rowsPerPage,
				pageIndex: currentPage,
				search: searchTerm,
				sort: sortColumn
		}}
    );
    return response.data.response;
};

export const getDistrict = async () => {
    try {
        const response = await privateGateway.get(yipRoutes.getDistrict);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};
export const getZone = async () => {
    try {
        const response = await privateGateway.get(yipRoutes.getZone);
        console.log(response);
    } catch (err) {
        console.log(err);
    }
};
export const getOrg = async (org_type: string) => {
    try {
        const response = await privateGateway.get(yipRoutes.getOrg, {
            params: {
                org_type: org_type,
				perPage: 6500,
				is_pagination: true
            },
        });
        return response.data.response.data as getOrgResponse[];
    } catch (err) {
        console.log(err);
    }
};

export const assignOrg = async (email: string, org: string[]) => {
    try {
        const res = await privateGateway.post(yipRoutes.assignOrg, {
            email: email,
            org_id: org,
        });
		return res.data.message.general[0];
    } catch (err:any) {
        throw err.response.data[0];
    }
};
