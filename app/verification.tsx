import { router } from "expo-router";
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
const Verification = () => {
  const onclick = () => {
    router.push("/locationallow")
  }
  return (
    <View>
      <Text>verification</Text>
      <TouchableOpacity onPress={() => onclick() }>
        <Text>click</Text>
      </TouchableOpacity>
    </View>
  )
}

export default Verification  