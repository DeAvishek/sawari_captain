import { router } from "expo-router";
import { AuthApi } from "../api/auth.api";
import { loginTypes } from "../types/login.types";
export function useLogin() {
    async function login(data: loginTypes) {
        try {
            if (data == null) throw new Error("data is null")
            const response = await AuthApi.login(data)
            console.log(response)
            if(response.status===200){
                router.push("/verification")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return {
        login
    };
}