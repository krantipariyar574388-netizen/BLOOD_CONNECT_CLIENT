import React from "react";
import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface IProps <T extends FieldValues>{
  name: Path<T>;
  type?: "text" | "password" | "email";
  label: string;
  placeholder?: string;
  id: string;
  register : UseFormRegister<T>
}

function Input<T extends FieldValues>({
  name,
  id,
  label,
  placeholder = "start typing..",
  type = "text",
  register
}: IProps<T>) {
  return (
    <div className="flex flex-col gap-0.5">
      <label className="text-sm front-semibold text-grap-600" htmlFor="email">
        {label}
      </label>
      <input
        {...register(name)}
        id={id}
        placeholder={placeholder}
        type={type}
        className="border border-gray-300 px-2 py-3 rounded-md focus : outline-sky-500 "
      />
    </div>
  );
};

export default Input;
