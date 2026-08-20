import { loginSchema, registerSchema } from "@/schema/auth.schema";
import * as yup from "yup";

// Login type
export type TLogin = yup.InferType<typeof loginSchema>;

// Register type
export type TRegister = yup.InferType<typeof registerSchema>;