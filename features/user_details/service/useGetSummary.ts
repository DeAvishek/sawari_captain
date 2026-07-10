import { useState } from "react";
import { UserDetailsApi } from "../api/userDetails.api";
import { userSummary } from "../types/userSummary.types";
export function useGetSummary(){
    const [loading, setloading] = useState<boolean>(false)
    const [userSummary,setuserSummary] = useState<userSummary>({
        earnings:0,
        rides:0,
        rating:0,
        onlineTime:0
    })
    async function getSummary(phoneNumber:string){
        try {
            setloading(true)
            const response = await UserDetailsApi.getSummaryofUser(phoneNumber)
            if(response.status=200){
                setuserSummary(prev=>({
                    ...prev,
                    rides:response.data.rides,
                    earnings:response.data.earnings,
                    rating:response.data.rating,
                    onlineTime:response.data.onlineTime
                }))
            }
        } catch (error) {
            console.log(error)
        } finally{
            setloading(false)
        }
    }
    return{
        getSummary,
        loading,
        userSummary
    }
}