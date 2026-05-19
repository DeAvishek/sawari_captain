import { z } from "zod";

export const signupSchema = z.object({
    userName:z.string().min(4,"Username must be four charecter long").max(10,"Username is too long"),
    phoneNumber:z.string().min(10,"Valid Phone Number Required")
});
export type SignupFormData = z.infer<typeof signupSchema>;