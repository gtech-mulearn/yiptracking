import { privateGateway } from "../../../services/ApiGateway/ApiGateway";
import {
    dynamicRoute,
    yipRoutes,
} from "../../../services/ApiGateway/Endpoints";

export const getInterns = async () => {
    const response = await privateGateway.get(
        dynamicRoute(yipRoutes.getInterns)
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
            },
        });
        return response.data.response;
    } catch (err) {
        console.log(err);
    }
};
