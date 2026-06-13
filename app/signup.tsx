import { zodResolver } from '@hookform/resolvers/zod';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";
import { userNameData, userNameSchema } from './schema/usernameSchema';
import { AuthStore } from './store/authstore';
const SignupPage = () => {
  const BACKEND_URL = "http://10.0.2.2:8088"
  const { handleSubmit, control, formState: { errors } } = useForm<userNameData>({
    resolver: zodResolver(userNameSchema),
    defaultValues: {
      userName: "",
      vehicleType: "",
    }
  })

  //store management--->
  const { phoneNumber, verified } = AuthStore()

  // -->end of store
  const onSubmit = async (data: userNameData) => {
    const body = {
      userName: data.userName,
      phoneNumber: phoneNumber,
      isVerified: verified,
      isOnline: true,
      isOnRide: false,
      vehicleType: data.vehicleType
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
      <View style={styles.LoginParent}>
        <View style={styles.LoginChild}>
          <View style={styles.inputSection}>
            <View style={styles.inputBlock}>
              <Text style={styles.TextStyle}>What's Your Name?</Text>
              <Controller
                control={control}
                name="userName"
                rules={{ required: true }}
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
              {errors && <Text style={{ color: 'red' }}>{errors.userName?.message}</Text>}
            </View>
            <View style={styles.inputBlock}>
              <Text style={styles.TextStyle}>What's Your Veichle type?</Text>
              <Controller
                control={control}
                name="vehicleType"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Veichle type"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                    value={value}
                    style={styles.Textinput}
                  />
                )}
              />
              {errors && <Text style={{ color: 'red' }}>{errors.vehicleType?.message}</Text>}
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
  );
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
    gap: 150,
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

export default SignupPage