import { server } from "@/core/api/server";
import { Endpoints } from "@/core/api/trip/endpoitns.trip";
import { tripTypes } from "../types/trip.types";
export class Trip{
    static tripAccepted(driverId:number,data:tripTypes){
        return server.post(Endpoints.rideAcceptedByDriver(driverId),data)
    }
}