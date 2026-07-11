import { AuthStore } from "@/features/auth/store/authstore";
import {
  Car,
  Clock,
  Star,
  Wallet,
} from "lucide-react-native";
import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGetSummary } from "../service/useGetSummary";

const UserSummaryScreen = () => {
  const phoneNumber = AuthStore.getState().phoneNumber
  const { userSummary,getSummary} = useGetSummary();
  useEffect(()=>{
    getSummary(phoneNumber||"")
  },[])
  const features = [
    {
      name: "Earnings",
      value: `₹${userSummary?.earnings ?? 0}`,
      icon: Wallet,
      color: "#1dc293",
    },
    {
      name: "Rides",
      value: userSummary?.rides ?? 0,
      icon: Car,
      color: "#1dc293",
    },
    {
      name: "Rating",
      value: userSummary?.rating ?? "0.0",
      icon: Star,
      color: "#1dc293",
    },
    {
      name: "Online Time",
      value: userSummary?.onlineTime ?? "0h",
      icon: Clock,
      color: "#1dc293",
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Today's Summary</Text>

      <View style={styles.row}>
        {features.map((item, index) => {
          const Icon = item.icon;

          return (
            <View key={index} style={styles.card}>
              <View
                style={[
                  styles.iconContainer,
                  { backgroundColor: `${item.color}20` },
                ]}
              >
                <Icon size={24} color={item.color} />
              </View>

              <Text style={styles.value}>{item.value}</Text>

              <Text style={styles.label}>{item.name}</Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 2,
    padding: 3,
    backgroundColor: "rgba(255, 255, 255, 0.95)", // translucent
    borderRadius: 10,
    // elevation: 4,
    // shadowColor: "#000",
    // shadowOpacity: 0.08,
    // shadowRadius: 8,
    height:130
  },

  heading: {
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 5,
    color: "#111827",
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  card: {
    alignItems: "center",
    flex: 1,
  },

  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 26,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 5,
  },

  value: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  label: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
    textAlign: "center",
  },
});

export default UserSummaryScreen;