import websocket from '@/app/helper/websocket';
type locationWithuser={
    latitude:number,
    longitude:number,
    userId:string|number
}
const sendLocation=({latitude,longitude,userId}:locationWithuser)=>{
    websocket.publish("/sawari/sendLocation",{
        latitude:latitude,
        longitude:longitude,
        userId:userId
    })
}
export default sendLocation