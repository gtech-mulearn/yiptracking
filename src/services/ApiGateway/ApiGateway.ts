import axios from "axios";

function getAccessToken(): string | null {
    return localStorage.getItem("accessToken");
}

export const privateGateway = axios.create({
    baseURL: import.meta.env.VITE_BACKEND_URL as string,
    headers: {
        "Content-Type": "application/json",
    },
});

privateGateway.interceptors.request.use(
    function (config) {
        // Check if the endpoint is not "/register"
        if (
            config.url !== "register/" &&
            config.url !== "login-muid/" &&
            config.url !== "forgot-password/" &&
            config.url !== "reset-password/"
        ) {
            const accessToken = getAccessToken();
            if (accessToken) {
                config.headers["Authorization"] = `Bearer ${accessToken}`;
            }
        }
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

privateGateway.interceptors.response.use(
    function (response) {
        return response;
    },
    function (error) {
        if (error.response && error.response.status === 403) {
            localStorage.removeItem("accessToken");
        }
        return Promise.reject(error);
    }
);

// USAGE OF API
// const fetchData = async () => {
//     try {
//         const response = await privateGateway.get("/some-endpoint");
//         console.log(response.data);
//     } catch (error) {
//         console.error("API error:", error);
//     }
// }