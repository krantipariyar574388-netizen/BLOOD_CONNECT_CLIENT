import { adminUserItemSchema, adminStatsSchema } from "@/schema/admin.schema";
import * as yup from "yup";

export type TAdminUserItem = yup.InferType<typeof adminUserItemSchema>;
export type TAdminStats = yup.InferType<typeof adminStatsSchema>;