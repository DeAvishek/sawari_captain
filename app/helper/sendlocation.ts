import websocket from '@/app/helper/websocket';
type location={
    latitude:number,
    longitude:number
}
const sendLocation=({latitude,longitude}:location)=>{
    websocket.publish("/sawari/sendLocation",{
        latitude:latitude,
        longitude:longitude
    })
}
export default sendLocation