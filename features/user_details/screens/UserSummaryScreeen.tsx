import {
  Car,
  Clock,
  Star,
  Wallet,
} from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useGetSummary } from "../service/useGetSummary";

const UserSummaryScreen = () => {
  const { userSummary } = useGetSummary();

  const features = [
    {
      name: "Earnings",
      value: `₹${userSummary?.earnings ?? 0}`,
      icon: Wallet,
      color: "#16A34A",
    },
    {
      name: "Rides",
      value: userSummary?.rides ?? 0,
      icon: Car,
      color: "#2563EB",
    },
    {
      name: "Rating",
      value: userSummary?.rating ?? "0.0",
      icon: Star,
      color: "#F59E0B",
    },
    {
      name: "Online Time",
      value: userSummary?.onlineTime ?? "0h",
      icon: Clock,
      color: "#7C3AED",
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
    margin: 2,
    padding: 3,
    backgroundColor: "#fff",
    borderRadius: 10,
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
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