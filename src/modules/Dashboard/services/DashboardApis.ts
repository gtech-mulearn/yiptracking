import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import {
    dynamicRoute,
    yipRoutes,
} from "../../../services/ApiGateway/Endpoints";

export const getProfile = async () => {
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getProfile)
        );
		return response.data.message
    } catch (error) {
        throw error;
    }
};

export const updateOrgStatus = async (data: OrgStatusData) => {
	try {
		const response = await privateGateway.post(
			dynamicRoute(yipRoutes.updateOrgStatus), data
		);
		console.log(response.data);
	} catch (error) {
		console.error("API error:", error);
	}
}