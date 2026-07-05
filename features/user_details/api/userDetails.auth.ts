import { server } from "@/core/api/server";
import { ENDPOINTS } from "@/core/api/user_details/endpoint";

export class UserDetailsApi{
    static getSummary(phoneNumber:string){
        console.log("Request has been made to URL",server.defaults.baseURL+ENDPOINTS.driverDetails.getUserSummary(phoneNumber));
        return server.get(ENDPOINTS.driverDetails.getUserSummary(phoneNumber))
    }
    static getRecentTrips(phoneNumber:string){
         console.log("Request has been made to URL",server.defaults.baseURL+ENDPOINTS.driverDetails.getRecentTrips(phoneNumber));
         return server.get(ENDPOINTS.driverDetails.getRecentTrips(phoneNumber))
    }
}