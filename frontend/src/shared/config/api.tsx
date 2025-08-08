import axiosInstance from './axiosinstance';

export const login = (data: {username: string, password: string}) => {
   return axiosInstance.post('/auth/login', data);
};

export const register = (data: {username: string, email: string, password: string}) => {
   return axiosInstance.post('/auth/register', data);
};

// Fix the endpoint path to match your backend route
export const getUserList = () => {
   return axiosInstance.get('/users');  // Changed from '/auth/users' to '/users'
};

export const searchUsers = (query: string) => {
  return axiosInstance.get(`/users/search?query=${query}`);  // Changed from '/auth/users/search' to '/users/search'
};

export const updateProfile = (data: {username: string, email: string}) => {
    return axiosInstance.put('/users/profile', data);
};