import { UseFormRegister, Path, FieldValues } from "react-hook-form";

interface RadioOption {
  label: string;
  value: string;
}

interface RadioGroupProps<T extends FieldValues> {
  name: Path<T>;
  label: string;
  register: UseFormRegister<T>;
  options: RadioOption[];
  error?: string;
}

function RadioGroup<T extends FieldValues>({
  name,
  label,
  register,
  options,
  error,
}: RadioGroupProps<T>) {
  return (
    <div className="flex flex-col gap-2 w-full">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <div className="grid grid-cols-2 gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className="flex items-center gap-2 border border-gray-300 rounded-sm px-4 py-3 text-sm cursor-pointer has-[:checked]:border-sky-500 has-[:checked]:bg-sky-50"
          >
            <input
              type="radio"
              value={option.value}
              {...register(name)}
              className="accent-sky-500"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );
}

export default RadioGroup;