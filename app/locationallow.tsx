import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import sendLocation from "./helper/sendlocation";
import websocket from './helper/websocket';
const Locationallow = () => {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    useEffect(() => {
        
        const locationRequest=async()=>{
            await websocket.connect();
            let{status} = await Location.requestForegroundPermissionsAsync();
            if(status==="granted"){
                const currLocation = await Location.getCurrentPositionAsync();
                sendLocation({latitude:currLocation.coords.latitude,longitude:currLocation.coords.longitude})
                console.log("Location access is already granted,by current location is ",currLocation.coords) //todo remove
                router.push('/home')
            }
        }
        locationRequest();
    }, [])
    const onClick = async () => {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
            setErrorMsg("!!!!!!");
            console.log(errorMsg)
            return;
        }
        const currLocation = await Location.getCurrentPositionAsync();
        sendLocation({latitude:currLocation.coords.latitude,longitude:currLocation.coords.longitude})
        console.log("Loaction granted successfully",currLocation.coords.latitude, currLocation.coords.longitude); //todo to remove
        router.push("/home")
    }

    return (
        <View>
            <TouchableOpacity  onPress={() => onClick()}>
                <Text style={style.button}>locationallow</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Locationallow
const style = StyleSheet.create({
    button: {
        backgroundColor: '#000',
        color: '#fff',
        width:100,
        height:50
    }
})