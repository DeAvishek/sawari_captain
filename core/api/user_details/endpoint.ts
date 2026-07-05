export const ENDPOINTS={
    driverDetails:{
        "getUserSummary":(identfier:string)=>`/Driver/summary/${identfier}`,
        "getRecentTrips":(identifier:string)=>`/Driver/recent_trips/${identifier}`
    }
}