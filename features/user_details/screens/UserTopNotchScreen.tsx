import { Bell, Menu } from "lucide-react-native";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const UserTopNotchScreen = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.icon}>
        <Menu size={24} color="#FFFFFF" />
      </TouchableOpacity>

      <Text style={styles.title}>
        Sawari <Text style={styles.subTitle}>Captain</Text>
      </Text>

      <TouchableOpacity style={styles.icon}>
        <Bell size={22} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 40,
    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    // backgroundColor: "#23a683", // translucent
    borderRadius: 10,

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.25)",
  },

  icon: {
    width: 40,
    height: 40,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
  },

  title: {
    flex: 1,
    textAlign: "center",
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  subTitle: {
    fontSize: 18,
    color: "#848688",
  },
});

export default UserTopNotchScreen;