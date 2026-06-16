export const ENDPOINTS = {
    auth:{
        "login":"/Driver/login",
        "signup":"/Driver/create",
        "verification":(
            phoneNumber:string
        )=>`/Driver/verify/${phoneNumber}`
    }
}