export interface StatusOption {
  label: string;
  value: string;
}

export const STATUS_OPTIONS: StatusOption[] = [
  { label: "Pending", value: "Pending" },
  { label: "Fulfilled", value: "Fulfilled" },
  { label: "Cancelled", value: "Cancelled" },
];