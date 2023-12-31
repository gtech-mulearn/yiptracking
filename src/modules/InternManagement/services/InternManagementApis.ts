import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import { dynamicRoute, yipRoutes } from "../../../services/ApiGateway/Endpoints";

export const getInterns = async () => {
    try {
        const response = await privateGateway.get(
            dynamicRoute(yipRoutes.getInterns)
        );
        return response.data.response;
    } catch (error) {
        throw error;
    }
};
