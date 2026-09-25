import React from "react";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface Option {
  label: string;
  value: string;
}

interface SelectProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  id: string;
  register: UseFormRegister<T>;
  error?: string;
  options: Option[];
  placeholder?: string;
}

function Select<T extends FieldValues>({
  name,
  label,
  id,
  register,
  error,
  options,
  placeholder,
}: SelectProps<T>) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-semibold text-gray-600">
        {label}
      </label>
      <select
        id={id}
        defaultValue=""
        {...register(name)}
        className={`border rounded-md px-2 py-3 w-full bg-white outline-none ${
          error
            ? "border-red-500 focus:outline-red-500 focus:border-red-500"
            : "border-gray-300 focus:outline-sky-500 focus:border-sky-500"
        }`}
      >
        <option value="" disabled>
          {placeholder ?? "Select an option"}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default Select;