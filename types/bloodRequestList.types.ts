import { bloodRequestItemSchema } from "@/schema/bloodRequestList.schema";
import * as yup from "yup";

export type TBloodRequestItem = yup.InferType<typeof bloodRequestItemSchema>;