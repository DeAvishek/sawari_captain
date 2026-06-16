import React from 'react'
import { Text, View } from 'react-native'
import { useLogin } from '../service/useLogin'
const LoginScreen = () => {
    const{login} = useLogin();
    //should pass the login to login form wher the actual data will be build
  return (
    <View>
      <Text>LoginScreen</Text>
    </View>
  )
}

export default LoginScreen