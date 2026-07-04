import * as Location from "expo-location"
import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE } from "react-native-maps"
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
        let subscribe: any;
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
        return () => {
            if (subscribe) {
                subscribe.remove()
            }
        }

    }, [])

    return (
        <View>
            <View style={style.mapdiv}>
                {loading ? (<Text>Loading....</Text>) : (
                    <MapView
                        provider={PROVIDER_GOOGLE}
                        // provider={PROVIDER_DEFAULT}
                        showsCompass={true}
                        showsTraffic={true}
                        style={StyleSheet.absoluteFillObject}
                        
                        region={{
                            latitude: latAndlong.latitude,
                            longitude: latAndlong.longitude,
                            latitudeDelta: 0.2,
                            longitudeDelta: 0.2
                        }}

                        userInterfaceStyle='dark'
                        customMapStyle={mapStyle}
                        showsUserLocation
                        showsMyLocationButton
                    >
                    </MapView>)}
            </View>
        </View>
    )
}
const style = StyleSheet.create({
    mapdiv: {
        // flex:1,
        height: 400,
        width: 'auto',
        // flex:1
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