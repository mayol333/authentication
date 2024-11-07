import axios from "axios";
import Cookies from "js-cookie";
import { router } from "../main";
const client = axios.create({
    url: "http://localhost:3000",
    withCredentials: true,
});

client.interceptors.request.use(
    (config) => {
        const token = Cookies.get("accessToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

client.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error) => {
        const prevRequest = error?.config;
        if (error?.response?.status === 401 && !prevRequest?.sent) {
            prevRequest.sent = true;
            try {
                await client.get("/api/refresh");
                const token = Cookies.get("accessToken");
                prevRequest.headers.Authorization = `Bearer ${token}`;
                return client(prevRequest);
            } catch (error) {
                router.navigate({ to: "/auth", replace: true });
                return Promise.reject(error);
            }
        } else {
            console.log(error);
        }
        return Promise.reject(error);
    }
);

export default client;
