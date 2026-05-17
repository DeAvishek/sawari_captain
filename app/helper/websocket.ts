import { Client } from "@stomp/stompjs";
import SockJs from "sockjs-client";
class WebsocketServe{
    private StompClient:Client|null = null;
    private URL:string = "http://192.168.0.117:8088/ws";
    private subscription:{
        topic:string,
        callback:(msg:any)=>void
    }[]=[]
    //constructor
    connect(){
        if(this.StompClient && this?.StompClient?.connected){
            console.log("Websocket connect is already opened ✅");
            return;
        }
        this.StompClient = new Client({
            webSocketFactory:()=>SockJs(this.URL),
            reconnectDelay:4000,
            onConnect:()=>{
                this.subscription.forEach(sub=>{
                    this.StompClient?.subscribe(sub.topic,sub.callback);
                })
                console.log("Websocket connection has been opened successfully ✅");
            },
            onDisconnect:()=>{
                console.log("Websocket Connetion closed ✅")
            }
        })
        return this.StompClient.activate();
    }

    //publish a message
    publish(destination:string,body:any){
        if(this.StompClient && this.StompClient.connected){
            this.StompClient.publish({
                destination:destination,
                body:JSON.stringify(body)
            })
        }
    }

    subscribe(topic:string,callback:(message:any)=>void){
        this.subscription.push({topic,callback});
        if(this.StompClient && this?.StompClient.connected){
            this.StompClient.subscribe(topic,callback);
        }
    }
    disconnect(){
        this.StompClient?.deactivate();
    }
}
export default new WebsocketServe();
