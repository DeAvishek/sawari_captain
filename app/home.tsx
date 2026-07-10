import { AuthStore } from "@/features/auth/store/authstore"
import IsReadyToGo from "@/features/user_details/components/IsReadyToGo"
import UserSummaryScreen from "@/features/user_details/screens/UserSummaryScreeen"
import UserTopNotchScreen from "@/features/user_details/screens/UserTopNotchScreen"
import { LinearGradient } from "expo-linear-gradient"
import * as Location from "expo-location"
import { LoaderCircleIcon } from "lucide-react-native"
import React, { useEffect, useState } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
import { SafeAreaView } from "react-native-safe-area-context"
import sendLocation from "./helper/sendlocation"
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
  const userId = AuthStore.getState().user?.userID
    useEffect(() => {
    let subscribe: any;
    async function getDone() { //instead of watching pos we can diretly set a interval to send location --->todo in future
      subscribe = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          timeInterval: 3000, //need to modify
          // distanceInterval: 3 //need to update
        },
        (location) => {
          let lati = location.coords.latitude;
          let longi = location.coords.longitude
          setlatAndlong({ latitude: lati, longitude: longi })
          sendLocation({latitude:lati,longitude:longi,userId:userId||0}) //send driver location through websocket
          console.log("new updated loc", { lati, longi ,userId})                //todo remove
          setLoading(false)
        }
      )

    }
    getDone()
    return () => {
      if (subscribe) {
        subscribe.remove()
      }
    }

  }, [])

  return (
    <LinearGradient colors={["#16ecbd", "#16ecbd", "transparent"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={style.container}
          showsVerticalScrollIndicator={false}
        >
          
          <UserTopNotchScreen />
          <View style={style.mapdiv}>
            {loading ? (<LoaderCircleIcon size={50} color='rgb(27, 185, 133) '/>) : (
              <MapView
                provider={PROVIDER_GOOGLE}
                showsCompass={true}
                showsTraffic={true}
                style={StyleSheet.absoluteFill}

                region={{
                  latitude: latAndlong.latitude,
                  longitude: latAndlong.longitude,
                  latitudeDelta: 0.002,
                  longitudeDelta: 0.002
                }}
                showsUserLocation
                showsMyLocationButton
              >
              </MapView>)}
          </View>
          {/* <View> */}
            {!loading && <IsReadyToGo/>}
            {!loading && <UserSummaryScreen />}
          {/* </View> */}
          </ScrollView>
        </SafeAreaView>
    </LinearGradient>
  )
}
const style = StyleSheet.create({
  container: {
        padding:5,
        gap:5,
  },
  main: {
    height: 800,
    width: 'auto',
  },
  mapdiv: {
    height: 320,
    width: 'auto',
    borderRadius:20
    // border
  }
})
const mapStyle = [
  {
    elementType: "geometry",
    stylers: [
      {
        color: "#302f2f",
      },
    ],
  },
  {
    elementType: "geometry.fill",
    stylers: [
      {
        saturation: -5,
      },
      {
        lightness: -5,
      },
    ],
  },
  {
    elementType: "labels.icon",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#212121",
      },
    ],
  },
  {
    featureType: "administrative",
    elementType: "geometry",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "administrative.country",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#9E9E9E",
      },
    ],
  },
  {
    featureType: "administrative.land_parcel",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "administrative.locality",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#BDBDBD",
      },
    ],
  },
  {
    featureType: "poi",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "poi.business",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "geometry",
    stylers: [
      {
        color: "#181818",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "poi.park",
    elementType: "labels.text.stroke",
    stylers: [
      {
        color: "#1B1B1B",
      },
    ],
  },
  {
    featureType: "road",
    stylers: [
      {
        visibility: "off",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "geometry.fill",
    stylers: [
      {
        color: "#2C2C2C",
      },
    ],
  },
  {
    featureType: "road",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#8A8A8A",
      },
    ],
  },
  {
    featureType: "road.arterial",
    elementType: "geometry",
    stylers: [
      {
        color: "#373737",
      },
    ],
  },
  {
    featureType: "road.highway",
    elementType: "geometry",
    stylers: [
      {
        color: "#3C3C3C",
      },
    ],
  },
  {
    featureType: "road.highway.controlled_access",
    elementType: "geometry",
    stylers: [
      {
        color: "#4E4E4E",
      },
    ],
  },
  {
    featureType: "road.local",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#616161",
      },
    ],
  },
  {
    featureType: "transit",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#757575",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "geometry",
    stylers: [
      {
        color: "#000000",
      },
    ],
  },
  {
    featureType: "water",
    elementType: "labels.text.fill",
    stylers: [
      {
        color: "#3D3D3D",
      },
    ],
  },
];
export default Home