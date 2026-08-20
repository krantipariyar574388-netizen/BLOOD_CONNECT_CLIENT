import React from "react";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface IProps <T extends FieldValues>{
  name: Path<T>;
  type?: "text" | "password" | "email";
  label: string;
  placeholder?: string;
  id: string;
  register : UseFormRegister<T>
  error?: string
}

function Input<T extends FieldValues>({
  name,
  id,
  label,
  placeholder = "start typing..",
  type = "text",
  register,
  error
}: IProps<T>) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-sm font-semibold text-grap-600" htmlFor={id}>
        {label}
      </label>
      <input
        {...register(name)}
        id={id}
        placeholder={placeholder}
        type={type}
        className={`border px-2 py-3 rounded-md  ${error ?
          "border-red-500 focus:outline-red-500 focus:border-red-500"
          :
          'border-gray-300 focus:outline-sky-500 focus:border-sky-500'}
        `}
        />
      <small className="text-red-500 h-3 -mt-0.5 ml-0.5">{error}</small>
    </div>
  );
};

export default Input;
