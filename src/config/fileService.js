import axios from "axios";
import { backendUrl } from './appConfig';

const axiosInstance = axios.create({
    baseURL: backendUrl,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("userToken");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => {
        console.log('Response');
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const apiRequest = async (url, param = {}, requestType = "get", config = {}) => {
    try {
        const response = await axiosInstance[requestType](url, param, config);
        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

export const fileUploadRequest = async (
    url,
    param = {},
    requestType = "get",
    isFileUpload = false,
    headers = {},
    contentType = null,
    onUploadProgress = null
) => {
    try {
        requestType = requestType.toLowerCase();
        const validMethods = ["get", "post", "put", "delete", "patch"];

        if (!validMethods.includes(requestType)) {
            throw new Error(`Invalid request type: ${requestType}`);
        }

        let response;

        if (isFileUpload && (requestType === "post" || requestType === "put")) {
            const formData = param instanceof FormData ? param : new FormData();

            if (!(param instanceof FormData)) {
                for (const key in param) {
                    formData.append(key, param[key]);
                }
            }

            const config = {
                headers: {
                    ...(contentType ? { "Content-Type": contentType } : {}),
                    ...headers,
                },
                onUploadProgress,
            };

            response = await axiosInstance[requestType](url, formData, config);
        } else if (requestType === "get") {
            response = await axiosInstance.get(url, {
                params: param,
                headers,
            });
        } else {
            response = await axiosInstance[requestType](url, param, {
                headers: {
                    ...(contentType ? { "Content-Type": contentType } : {}),
                    ...headers,
                },
            });
        }

        return response.data;
    } catch (error) {
        console.error("API Error:", error.response?.data || error.message);
        throw error;
    }
};

