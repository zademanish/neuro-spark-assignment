import axios from "axios";

// user URL
const API_BASE_URL = "http://localhost:5000/api/users"; 

// Admin URL
const ADMIN_BASE_URL = "http://localhost:5000/api/users/admin";

// Create an instance of Axios
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

const api2 = axios.create({
    baseURL: ADMIN_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Function to handle user login
export const loginUser = async (email, password) => {
    try {
        const response = await api.post("/login", { email, password });
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ?  error.response.data.message : "Login failed!";
    }
};
// register
export const registerUser = async (name,email, password) => {
    try {
        const response = await api.post("/register", { name,email, password });
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data.message : "Internal server Error!";
    }
};

// get single user
export const getUser = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await api.get("/profile",{headers:{
            Authorization:`Bearer ${token}`}});
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data.message : "Internal server Error!";
    }
};

// get all users
export const getAllUser = async () => {
    try {
        const token = localStorage.getItem("token")
        const response = await api2.get("/getallusers",{headers:{
            Authorization:`Bearer ${token}`}});
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data.message : "Internal server Error!";
    }
}

// update role
export const UpdateRole = async (userId,newRole) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api2.patch(`/user/role`,{userId,newRole},{headers:{
            Authorization:`Bearer ${token}`}});
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data.message : "Internal server Error!";
    }
}

// delete user
export const DeleteUser = async (userId) => {
    console.log(userId);
    try {
        const token = localStorage.getItem("token");
        const response = await api2.delete(`/user/deleteuser?userid=${userId}`,{headers:{
            Authorization:`Bearer ${token}`}});
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data.message : "Internal server Error!";
    }
}

export const getAllSchedule = async () => {
    
    try {
        const token = localStorage.getItem("token");
        const response = await api2.get(`/user/getallschedule`,{headers:{
            Authorization:`Bearer ${token}`}});
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data.message : "Internal server Error!";
    }
}


export const updateStatus = async (userId,newStatus) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api2.patch(`/user/updatestatus`,{userId,newStatus},{headers:{
            Authorization:`Bearer ${token}`}});
        return response.data; // Return the response data
    } catch (error) {
        throw error.response ? error.response.data.message : "Internal server Error!";
    }
}


// Function to set Authorization header for protected routes
export const setAuthToken = (token) => {
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
};

export default api;
