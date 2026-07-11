import { useState } from "react";
import { UserDetailsApi } from "../api/userDetails.api";
import { Trips } from "../types/recentTrips.types";
export function useGetRecentTrips() {
    const [loading, setLoading] = useState<boolean>(false)
    const [tripDetails, setTripDetails] = useState<Trips[]>([]);
    async function getRecentTrips(phoneNumber: string) {
        try {
            setLoading(true)

            console.log(loading)
            const response = await UserDetailsApi.getRecentTrips(phoneNumber)
            console.log(response.data)
            if (response.status === 200) {
                const saintizeTrips: Trips[] = response.data.map((backendItem: any) => ({
                    source: backendItem?.source,
                    destination: backendItem?.destination,
                    tripStatus: backendItem?.tripStatus,
                    fare: backendItem?.tripStatus,
                    distance: backendItem?.distance,
                    duration: backendItem?.duration,
                    completedAt: backendItem?.completedAt
                }))
                console.log("this is result",saintizeTrips) //todo to remove
                setTripDetails(saintizeTrips);
            }
        } catch (error) {
            console.log("hii",error)
        }finally{
            setLoading(false);
        }
    }
    return{
        loading,
        tripDetails,
        getRecentTrips
    }
} 