import { notificationItemSchema } from "@/schema/notification.schema";
import * as yup from "yup";

export type TNotificationItem = yup.InferType<typeof notificationItemSchema>;