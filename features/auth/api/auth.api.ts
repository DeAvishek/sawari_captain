import { ENDPOINTS } from "@/core/api/auth/endpoint";
import { server } from "@/core/api/server";
import { loginTypes } from "../types/login.types";
import { signupTypes } from "../types/signup.types";
import { verifyOtpTypes } from "../types/verifyotp.types";
export class AuthApi{
    static login(data:loginTypes){
        console.log("Request has been made to URL",server.defaults.baseURL+ENDPOINTS.auth.login);
        return server.post(ENDPOINTS.auth.login,data)
    }
    static signup(data:signupTypes){
        console.log("Request has benn made to URL",server.defaults.baseURL+ENDPOINTS.auth.signup)
        return server.post(ENDPOINTS.auth.signup,data)
    }
    static verifyOtp(data:verifyOtpTypes,phoneNumber:string){
        console.log("Request has been made to URL",server.defaults.baseURL+ENDPOINTS.auth.verification(phoneNumber))
        return server.post(ENDPOINTS.auth.verification(phoneNumber),data)
    }
    static refreshToken(refreshToken:string){
        console.log("Request has been made to URL",server.defaults.baseURL+ENDPOINTS.auth.refreshtoken(refreshToken))
        return server.get(ENDPOINTS.auth.refreshtoken(refreshToken));
    }
}