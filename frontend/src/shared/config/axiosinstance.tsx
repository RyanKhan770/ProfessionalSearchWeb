import axios from "axios";

const axiosInstance = axios.create({
<<<<<<< HEAD
    baseURL: "http://localhost:3000/api",
    withCredentials: true,
});

=======
    baseURL: "http://localhost:3000/api", // Make sure this matches your backend URL
    withCredentials: true,
});

// Add a request interceptor to include the auth token in all requests
>>>>>>> e383b20c27efaae52f850442894360ca316df6b6
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default axiosInstance;