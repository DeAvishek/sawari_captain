import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Image } from "expo-image";
import { router } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, TextInput, TouchableOpacity, View, } from "react-native";
import { phoneNumberData, phoneNumberSchema } from "./schema/phonenumberSchema";
import { AuthStore } from "./store/authstore";
export default function Index() {
  const { handleSubmit, control, formState: { errors } } = useForm<phoneNumberData>({
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber:""
    }
  })
  const setPhoneNumber = AuthStore(state=>state.setPhoneNumber)
  const BACKEND_URL = "http://10.0.2.2:8088"
  const onSubmit=async(data:phoneNumberData)=>{
    try {
      const response = await axios.post(`${BACKEND_URL}/Driver/login`,data)
      if(response.status===200){
        setPhoneNumber(response.data?.phoneNumber);
        console.log(response.data)
        setTimeout(() => {
          router.push('/verification')
        }, 2000);
      }
    } catch (error) {
      console.log("hii",error)
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

          {/* ===== INPUT SECTION ===== */}
          <View style={styles.inputSection}>
            <View style={styles.inputBlock}>
              <Text style={styles.TextStyle}>What's Your Number?</Text>
              <Controller
                control={control}
                name="phoneNumber"
                rules={{ required: true }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="PhoneNumber"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    keyboardType="number-pad"
                    value={value}
                    style={styles.Textinput}
                  />
                )}
              />
              {errors && <Text style={{color:'red'}}>{errors.phoneNumber?.message}</Text>}
            </View>
          </View>

          {/* ===== BUTTON SECTION ===== */}
          <View style={styles.buttonSection}>
            <TouchableOpacity style={styles.button} onPress={() => router.push("/verification")}>
              <Text style={styles.buttonText}>N e x t</Text>
            </TouchableOpacity>

            <Text style={styles.orText}>OR</Text>

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