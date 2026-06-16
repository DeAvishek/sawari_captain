import axios from "axios";
import { ENV } from "../config/Env";
export const server = axios.create({
    baseURL:ENV.BASE_URL
})