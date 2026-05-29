import AsyncStorage from "@react-native-async-storage/async-storage";
import { create, } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
type User = {
    userName: string | null,
    userID: number | null,
    role: string | null
    verified: boolean
}
type AuthState = {
    phoneNumber: string|null,
    jwt: string | null,
    user: User | null;
}
type Actions = {
    setPhoneNumber: (phoneNumber: string) => void;
    logout: () => void;
    setJwt: (jwt: string) => void;
    setUser: (user: User) => void

}
export const AuthStore =
    create<AuthState & Actions>()(persist((set)=>({
                // state
                phoneNumber: "",
                jwt: null,
                user: null,
                // actions
                setPhoneNumber:(phonenumber)=> set({phoneNumber:phonenumber}),
                setJwt:(jwt)=>set({jwt:jwt}),
                setUser:(user)=>set({user:user}),
                logout:()=>set({phoneNumber:null,jwt:null,user:null})

            }),
            {
                name: "auth-storage",

                storage: createJSONStorage(
                    () => AsyncStorage
                )
            }

        ));