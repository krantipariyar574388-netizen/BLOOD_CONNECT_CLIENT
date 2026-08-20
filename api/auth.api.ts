import { TLogin, TRegister } from "@/types/auth.types";
import axios from "axios";

// Login
export const login = async (data : TLogin) => {
    try {
        const response = await axios.post(
            "http://localhost:8003/users/login",
            data,
        );
        console.log(response.data);
        return response.data;
    } catch (error : any) {
        console.log(error);
        throw error?.response.data;
    }
};

// Register 
export const register = async (data : TRegister) => {
    try {
        const response = await axios.post(
            "http://localhost:8003/users/register",
            data,
        );
        console.log(response.data);
        return response.data;
    } catch (error : any) {
        console.log(error);
        throw error?.response.data;
    }
};