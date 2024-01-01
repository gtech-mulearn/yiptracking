import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import {
    dynamicRoute,
    yipRoutes,
} from "../../../services/ApiGateway/Endpoints";

export const getProfile = async (id: string | undefined) => {
    if (id) {
        try {
            const response = await privateGateway.get(
                dynamicRoute(yipRoutes.getProfile),
                {
                    params: {
                        email: id,
                    },
                }
            );
            return response.data.message;
        } catch (error) {
            throw error;
        }
    } else {
        try {
            const response = await privateGateway.get(
                dynamicRoute(yipRoutes.getProfile)
            );
            return response.data.message;
        } catch (error) {
            throw error;
        }
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

export const updateProfile = async (data: ProfileEditData) => {
    try {
        const response = await privateGateway.put(
            dynamicRoute(yipRoutes.updateProfile),
            data
        );
        console.log(response.data);
    } catch (error) {
        console.error("API error:", error);
    }
};