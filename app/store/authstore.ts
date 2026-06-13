import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type User = {
    userName: string | null;
    userID: number | null;
    role: string | null;
};

type AuthState = {
    phoneNumber: string | null; // Keeps type consistency
    jwt: string | null;
    user: User | null;
    verified: boolean;
    vehicleType: string | null;
};

type Actions = {
    setPhoneNumber: (phoneNumber: string | null) => void;
    logout: () => void;
    setJwt: (jwt: string | null) => void;
    setUser: (user: User | null) => void;
    setVerified: (status: boolean) => void;
    setVehicleType: (type: string | null) => void;
};

// Initial state object for easy re-use during logout
const initialState: AuthState = {
    phoneNumber: null,
    jwt: null,
    user: null,
    verified: false,
    vehicleType: null,
};

export const AuthStore = create<AuthState & Actions>()(
    persist(
        (set) => ({
            ...initialState,

            // Actions
            setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
            setJwt: (jwt) => set({ jwt }),
            setUser: (user) => set({ user }),
            setVerified: (status) => set({ verified: status }),
            setVehicleType: (type) => set({ vehicleType: type }),
            
            // Clean logout that flushes everything
            logout: () => set({ ...initialState }),
        }),
        {
            name: "auth-storage",
            storage: createJSONStorage(() => AsyncStorage),
        }
    )
);