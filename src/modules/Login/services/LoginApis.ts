import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import { dynamicRoute, yipRoutes } from "../../../services/ApiGateway/Endpoints";

export const login = async (email: string, password: string) => {
    try {
        const response = await privateGateway.post(dynamicRoute(yipRoutes.login), {
			email: email,
			password: password,
		});
        console.log(response.data);
		return response.data;
    } catch (error) {
        throw error
    }
}
