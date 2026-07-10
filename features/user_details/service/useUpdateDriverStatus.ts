import { UserDetailsApi } from "../api/userDetails.api";
import { driverOnlineStatus } from "../types/driverOnileStatus.types";

export function useUpdateDriverStatus(){
    async function updateStatus(data:driverOnlineStatus){
        try {
            const response = await UserDetailsApi.updateDriverStatus(data);
            if(response.status ===200){
                console.log(response.data)
            }
        } catch (error) {
            console.log(error)
        }
    }
    return{
        updateStatus
    }
}