import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface FileInputProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  id: string;
  register: UseFormRegister<T>;
  error?: string;
  accept?: string;
}

function FileInput<T extends FieldValues>({
  name,
  label,
  id,
  register,
  error,
  accept = "image/*,.pdf",
}: FileInputProps<T>) {
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={id} className="text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        id={id}
        type="file"
        accept={accept}
        {...register(name)}
        className={`border rounded-sm px-3 py-2 text-sm outline-none cursor-pointer
          file:mr-3 file:py-1.5 file:px-3 file:rounded-sm file:border-0
          file:bg-sky-500 file:text-white file:text-sm file:cursor-pointer
          ${error ? "border-red-500" : "border-gray-300"}`}
      />
      <p className="text-xs text-gray-500">
        Upload a prescription or medical document as proof (image or PDF, max 5MB)
      </p>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default FileInput;