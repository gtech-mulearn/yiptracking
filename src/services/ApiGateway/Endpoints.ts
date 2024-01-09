export const dynamicRoute = (route: string, ...args: string[]) => {
    let replacedRoute = route;
    args.forEach((arg) => {
        if (arg) {
            replacedRoute = replacedRoute.replace(/\${[a-zA-Z]+}/, arg);
        }
    });
    return replacedRoute;
};

export const yipRoutes = {
    // createReport: "/api/v1/dashboard/lc/${LcID}/report/create/",
    login: "/auth/user-authentication/",
    getProfile: "/auth/profile/",
    updateProfile: "/auth/profile/update/",
    resetPassword: "/auth/reset-password/",
    updateOrgStatus: "/organization/update-status/",
    getInterns: "/auth/user-list/",
    getDistrict: "/location/district/",
    getZone: "/location/zone/",
    getOrg: "/organization/list/",
    assignOrg: "/organization/assign/",
    getIdeaData: "/organization/idea/total/",
};
