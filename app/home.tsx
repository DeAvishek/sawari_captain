import { AuthStore } from "@/features/auth/store/authstore"
import NotificationBar from "@/features/trips/Components/NotificationBar"
import { tripTypes } from "@/features/trips/types/trip.types"
import IsReadyToGo from "@/features/user_details/components/IsReadyToGo"
import RecentTrips from "@/features/user_details/components/RecentTrips"
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
import websocket from "./helper/websocket"
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
  const [tripRequest, setTripRequest] = useState<tripTypes | null>(null);
  const [isPopUpNotification,setisPopUpNotification] = useState<boolean>(false);
  const userId = AuthStore.getState().user?.userID
  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    const sendCurrentLocation = async () => {
      try {
        const location = await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        setlatAndlong({
          latitude,
          longitude,
        });

        sendLocation({
          latitude,
          longitude,
          userId: userId || 0,
        });

        console.log("new updated loc", {
          latitude,
          longitude,
          userId,
        });

        setLoading(false);
      } catch (error) {
        console.log("Error getting location:", error);
      }
    };

    // Get location immediately
    sendCurrentLocation();

    // Then every 3 seconds
    interval = setInterval(sendCurrentLocation, 100000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  //-->
  websocket.subscribe(`/topic/trip/toDriver/${userId}`, (message) => {
    const decoder = new TextDecoder();
    const jsonString = decoder.decode(message._binaryBody);
    const trip: tripTypes = JSON.parse(jsonString);
    setTripRequest(trip);
    setNotficationState()
    console.log(trip)
  })
  const setNotficationState=()=>{
    setisPopUpNotification(!isPopUpNotification);
  }
  return (
    <LinearGradient colors={["#16ecbd", "#16ecbd", "transparent"]} style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          contentContainerStyle={style.container}
          showsVerticalScrollIndicator={false}
        >

          <UserTopNotchScreen />
          <View style={style.mapdiv}>
            {loading ? (<LoaderCircleIcon size={50} color='rgb(27, 185, 133) ' />) : (
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
          {!loading && <IsReadyToGo />}
          {!loading && <UserSummaryScreen />}
          <RecentTrips />
          {(tripRequest && isPopUpNotification) && <NotificationBar tripId={tripRequest.tripId} source={tripRequest.source}
          destination={tripRequest.destination} 
          fare={tripRequest.fare}
          duration={tripRequest.duration}
          sourceLatitude={tripRequest.sourceLatitude}
          sourceLongitude={tripRequest.sourceLongitude}
          distance={tripRequest.distance}
          setState={setNotficationState}
          />}
        </ScrollView>
      </SafeAreaView>
    </LinearGradient>
  )
}
const style = StyleSheet.create({
  container: {
    padding: 5,
    gap: 5,
  },
  main: {
    height: 800,
    width: 'auto',
  },
  mapdiv: {
    height: 320,
    width: 'auto',
    borderRadius: 20
    // border
  },
  notificationBar: {
    position: "absolute",
    top: 50,
    left: 15,
    right: 15,
    padding: 16,
    borderRadius: 12,
    backgroundColor: "white",
    elevation: 8,
    shadowOpacity: 0.2,
  },

  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },

  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
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