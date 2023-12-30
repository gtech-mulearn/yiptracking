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
	login: "/api/auth/user-authenticaion/",
};

