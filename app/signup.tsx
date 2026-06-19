import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { userNameData, userNameSchema } from '../features/auth/schema/usernameSchema';
import { AuthStore } from './store/authstore';
const Signup = () => {
  const { phoneNumber, verified } = AuthStore();
  const BACKEND_URL = "http://192.168.0.117:8088"
  const { handleSubmit, control, formState: { errors } } = useForm<userNameData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      userName: "",
      vehicleType: "",
    }
  })
  const onSubmit = async (data: userNameData) => {
    try {
      console.log(data)
      const body = {
        userName: data.userName,
        phoneNumber: phoneNumber,
        isVerified: verified,
        isOnline: true,
        isOnRide: false,
        vehicleType: data.vehicleType
      }
      const response = await axios.post(`${BACKEND_URL}/Driver/create`, body);
      if (response.status === 201) {
        console.log(response.data) //todo to remove
        router.push("/locationallow")
      }
    } catch (error) {
      console.log("Error at sign up", error)
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.topImagediv}>
        <Image
          style={styles.topimage}
          resizeMode="stretch"
          source={require("@/assets/images/captain.png")}
        />
      </View>
      <View style={styles.LoginParent}>\
        <View style={styles.LoginChild}>
          <View style={styles.inputSection}>
            <View style={styles.inputBlock}>
              <Text style={styles.TextStyle}>What's Your Name?</Text>
              <Controller
                control={control}
                name="userName"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Username"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                    value={value}
                    style={styles.Textinput}
                  />
                )}
              />
              {errors.userName && <Text style={{ color: 'red' }}>{errors.userName?.message}</Text>}
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.TextStyle}>What's Your Name?</Text>
              <Controller
                control={control}
                name="vehicleType"
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="vehicle type"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                    value={value}
                    style={styles.Textinput}
                  />
                )}
              />
              {errors.vehicleType && <Text style={{ color: 'red' }}>{errors.vehicleType?.message}</Text>}
            </View>
          </View>
          <View style={styles.buttonSection}>
           <TouchableOpacity style={styles.button} onPress={handleSubmit(onSubmit)}>
             <Text style={styles.buttonText}>L o g i n</Text>
           </TouchableOpacity>
         </View>
        </View>
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },

  topImagediv: {
    height: 250,
    width: '100%',
  },

  topimage: {
    width: '100%',
    height: '100%',
  },
  LoginParent: {
    position: 'absolute',
    top: 240,
    left: 0,
    right: 0,
    backgroundColor: '#ececec',
    borderRadius: 20,
    padding: 20,
    height: 760,
  },

  LoginChild: {
    flex: 1,
    gap: 150, // 🔥 KEY LINE
  },

  /* INPUT SECTION */
  inputSection: {
    gap: 20,
  },

  inputBlock: {
    width: '100%',
  },

  TextStyle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#010606',
  },

  Textinput: {
    height: 50,
    backgroundColor: '#F1F5F9',
    borderRadius: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#0F766E',
  },

  /* BUTTON SECTION */
  buttonSection: {
    alignItems: 'center',
    gap: 20,
  },

  orText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },

  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#0F766E',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Signup