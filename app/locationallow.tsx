import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import sendLocation from "./helper/sendlocation";
import websocket from './helper/websocket';
const { width } = Dimensions.get('window');
const Locationallow = () => {
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    useEffect(() => {

        const locationRequest = async () => {
            await websocket.connect();
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status === "granted") {
                const currLocation = await Location.getCurrentPositionAsync();
                sendLocation({ latitude: currLocation.coords.latitude, longitude: currLocation.coords.longitude })
                console.log("Location access is already granted,by current location is ", currLocation.coords) //todo remove
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
        sendLocation({ latitude: currLocation.coords.latitude, longitude: currLocation.coords.longitude })
        console.log("Loaction granted successfully", currLocation.coords.latitude, currLocation.coords.longitude); //todo to remove
        router.push("/home")
    }

    return (
        <View style={styles.container}>
      <View style={styles.topImagediv}>
        <Image
          style={styles.topimage}
          resizeMode="cover"
          source={require("../assets/images/captain.png")} />
      </View>
      {/* Content */}
      <View style={styles.main}>
        <LinearGradient
          colors={['#27c09f', 'transparent']}
          style={styles.gradientView}
        />
        <View style={styles.content}>
          <Text style={styles.title}>
            Location permission not enabled
          </Text>
          <Text style={styles.subtitle}>
            Sharing location permission helps us improve your ride booking and
            pickup experience
          </Text>
        </View>

        {/* Buttons */}
        <View style={styles.buttonWrapper}>
          <TouchableOpacity style={styles.primaryButton} onPress={onClick}>
            <Text style={styles.primaryText}>A l l o w  P e r m i s s i o n</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
    )
}

export default Locationallow
const MINT = "#0F766E";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    justifyContent: "space-between",
  },
  content: {
    paddingHorizontal: 30,
    paddingVertical: 30,
    zIndex: 1,
  },
  main: {
    flex: 1,
    justifyContent: 'space-between'
  },
  title: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111827",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#111827",
    lineHeight: 22,
  },

  buttonWrapper: {
    paddingHorizontal: 24,
    paddingBottom: 30,
    zIndex: 1,
  },

  primaryButton: {
    backgroundColor: MINT,
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  primaryText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },

  secondaryButton: {
    backgroundColor: "#E5E7EB",
    height: 52,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
  },
  gradientView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 500,
    zIndex: 0,
  },
  secondaryText: {
    color: "#111827",
    fontSize: 15,
    fontWeight: "500",
  },
  topImagediv: {
    height: 300,
    width: '100%',
  },

  topimage: {
    width: '100%',
    height: '100%',
  },
});