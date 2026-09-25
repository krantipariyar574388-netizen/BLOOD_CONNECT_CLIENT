import { bloodRequestSchema } from "@/schema/bloodRequest.schema";
import * as yup from " yup";

export type TCreateBloodRequest = yup.InferType<typeof bloodRequestSchema>;