export interface tripTypes{
    tripId:number|null
    sourceLatitude:number|null
    sourceLongitude:number|null
    source:string|null
    destination:string|null
    fare:number|null
    distance:number|null
    duration:number|null
    setState:()=>void
}