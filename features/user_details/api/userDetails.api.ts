import { server } from "@/core/api/server";
import { ENDPOINTS } from "@/core/api/user_details/endpoint";
import { AuthStore } from "@/features/auth/store/authstore";
import { driverOnlineStatus } from "../types/driverOnileStatus.types";

export class UserDetailsApi{
    
    static getSummaryofUser(phoneNumber:string){
        const jwt = AuthStore.getState().jwt
        console.log("Request has been made to URL",server.defaults.baseURL+ENDPOINTS.driverDetails.getUserSummary(phoneNumber));
        return server.get(ENDPOINTS.driverDetails.getUserSummary(phoneNumber),{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })

    }
    static updateDriverStatus(data:driverOnlineStatus){
        const jwt = AuthStore.getState().jwt
        console.log("Request has been made to URL",server.defaults.baseURL+ENDPOINTS.driverDetails.updateReadyStatus);
        return server.post(ENDPOINTS.driverDetails.updateReadyStatus,data,{
            headers:{
                Authorization:`Bearer ${jwt}`
            }
        })
    }
    static getRecentTrips(phoneNumber:string){
         console.log("Request has been made to URL",server.defaults.baseURL+ENDPOINTS.driverDetails.getRecentTrips(phoneNumber));
         return server.get(ENDPOINTS.driverDetails.getRecentTrips(phoneNumber))
    }
}