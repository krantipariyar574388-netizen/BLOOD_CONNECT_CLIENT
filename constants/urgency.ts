export interface UrgencyOption {
  label: string;
  value: string;
}

export const URGENCY_OPTIONS: UrgencyOption[] = [
  { label: "Low", value: "low" },
  { label: "Medium", value: "medium" },
  { label: "High", value: "high" },
  { label: "Critical", value: "critical" },
];