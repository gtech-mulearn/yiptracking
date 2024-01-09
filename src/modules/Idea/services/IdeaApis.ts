import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import { dynamicRoute, yipRoutes } from "../../../services/ApiGateway/Endpoints";

export const getIdeaData = async () => {
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getIdeaData), { params: {
				org_type: "School",
			} }
        );
		return response.data.response;
    } catch (error) {
        throw error;
    }
};
