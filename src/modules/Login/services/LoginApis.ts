import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import { dynamicRoute, yipRoutes } from "../../../services/ApiGateway/Endpoints";

export const login = async (email: string, password: string) => {
    try {
        const response = await privateGateway.post(dynamicRoute(yipRoutes.login), {
			email: email,
			password: password,
		});
        const message = response.data.response
		localStorage.setItem("accessToken", message.accessToken);
		localStorage.setItem("refreshToken", message.refreshToken);
		localStorage.setItem("roles", message.roles);
		return message;
    } catch (error: any) {
        throw error.response.data.message.general[0];
    }
}
