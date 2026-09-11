import { useState } from "react";
import { Trip } from "../Api/trip.api";
import { tripTypes } from "../types/trip.types";
export function useTripAcceptanceByDriver(){
    const [loading,setLoading] = useState<boolean>(false);
    async function tripAcceptedbyDriver(data:tripTypes){
        try {
            setLoading(true);
            const response = await Trip.tripAccepted(data.driverId||0,data);
            if(response.status===200){
                //todo somthing
            }
        } catch (error:unknown) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }
    return{
        tripAcceptedbyDriver,
        loading,
    }
}