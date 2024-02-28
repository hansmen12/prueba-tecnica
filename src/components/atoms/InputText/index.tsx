import { Path, UseFormRegister } from "react-hook-form";
import { IFormValues } from "../../../interfaces/IFormValues";

interface Props {
  label: string;
  register: UseFormRegister<IFormValues>;
  name: Path<IFormValues>;
  type: "text" | "number";
  error: any;
}

export const InputText = ({ label, register, name, type, error }: Props) => {
  return (
    <div>
      <label className="block mb-2 text-xs font-medium text-gray-100 dark:text-gray-400 line-clamp-1 truncate">
        {label}
      </label>
      <input
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        type={type}
        {...register(name, { required: true })}
      />
      {error && (
        <p role="alert" className="text-red-400 text-xs">
          *{error}
        </p>
      )}
    </div>
  );
};
