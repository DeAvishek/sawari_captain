import * as Location from "expo-location"
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { Marker } from "react-native-maps"
const Home = () => {
    type location = {
        latitude: number,
        longitude: number
    }
    const [latAndlong, setlatAndlong] = useState<location>({
        latitude: 0,
        longitude: 0
    })
    const [loading, setLoading] = useState<boolean>(true);
    useEffect(() => {
        let subscribe:any;
        async function getDone() {
                subscribe = await Location.watchPositionAsync(
                {
                    accuracy: Location.Accuracy.High,
                    timeInterval: 1000, //need to modify
                    distanceInterval: 2 //need to update
                },
                (location) => {
                    let lati = location.coords.latitude;
                    let longi = location.coords.longitude
                    setlatAndlong({ latitude: lati, longitude: longi })
                    console.log("new updated loc", { lati, longi })             //todo remove
                    setLoading(false)
                }
            )

        }
        getDone()
        // const timer = setTimeout(() => {
        //     setLoading(false);
        // }, 5000)
        // return () => {
        //     clearTimeout(timer)
        // }
        return ()=>{
            if(subscribe){
                subscribe.remove()
            }
        }

    }, [])
    return (
        <View>
            <View style={style.mapdiv}>
                {loading ? (<Text>Loading....</Text>) : (<MapView
                    showsCompass={true}
                    showsTraffic={true}
                    style={StyleSheet.absoluteFillObject}
                    region={{
                        latitude: latAndlong.latitude,
                        longitude: latAndlong.longitude,
                        latitudeDelta: 0.1,
                        longitudeDelta: 0.1
                    }}
                >
                    <Marker
                        coordinate={{ latitude: latAndlong.latitude, longitude: latAndlong.longitude }}
                        title="me"
                    />
                </MapView>)}
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    mapdiv:{
        // flex:1,
        height:400,
        width:'auto'
    }
})

export default Home