import { donorItemSchema } from "@/schema/donor.schema";
import * as yup from "yup";

export type TDonorItem = yup.InferType<typeof donorItemSchema>;