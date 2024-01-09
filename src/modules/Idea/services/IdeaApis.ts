import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import { dynamicRoute, yipRoutes } from "../../../services/ApiGateway/Endpoints";

export const getIdeaData = async (type: string) => {
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getIdeaData),
            {
                params: {
                    org_type: type,
                },
            }
        );
        return response.data.response;
    } catch (error) {
        throw error;
    }
};
