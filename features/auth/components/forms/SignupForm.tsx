import { zodResolver } from '@hookform/resolvers/zod'
import React from 'react'
import { Controller, useForm } from "react-hook-form"
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { userNameData, userNameSchema } from '../../schema/usernameSchema'
import { useSignup } from '../../service/useSignup'
import { AuthStore } from '../../store/authstore'
type props = {
    loading: boolean
}
const SignupForm = ({ loading }: props) => {
    const { phoneNumber, verified } = AuthStore();
    const { control, handleSubmit, formState: { errors } } = useForm<userNameData>({
        resolver: zodResolver(userNameSchema),
        defaultValues: {
            userName: "",
            vehicleType: "",
        }
    })
    const{signup} = useSignup()
    const onSubmit = (data: userNameData) => {
        const body = {
            userName: data.userName,
            phoneNumber: phoneNumber,
            isVerified: verified,
            isOnline: true,
            isOnRide: false,
            vehicleType: data.vehicleType
        }
        signup(body)
    }
    return (
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
                    <Text style={styles.TextStyle}>What's Your Vehicle type?</Text>
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
                    <Text style={styles.buttonText}>{loading?"Loading..":"S i g n - u p"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
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


export default SignupForm