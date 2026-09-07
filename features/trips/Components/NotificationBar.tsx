import React from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { tripTypes } from '../types/trip.types'
const NotificationBar = (tripRequest:tripTypes) => {
    return (
        <View style={style.notificationBar}>
            <Text style={style.title}>🚕 New Ride Request</Text>

            <Text>
                {tripRequest.source} → {tripRequest.destination}
            </Text>

            <Text>Fare: ₹{tripRequest.fare}</Text>

            <View style={style.buttons}>
                <TouchableOpacity
                    onPress={() => console.log("hii")}
                >
                    <Text>Reject</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => {
                        console.log("Accept:", tripRequest.tripId);
                    }}
                >
                    <Text>Accept</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const style = StyleSheet.create({
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

export default NotificationBar