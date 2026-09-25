export interface UrgencyOption {
  label: string;
  value: string;
}

export const URGENCY_OPTIONS: UrgencyOption[] = [
  { label: "Low", value: "LOW" },
  { label: "Medium", value: "MEDIUM" },
  { label: "High", value: "HIGH" },
  { label: "Critical", value: "CRITICAL" },
];