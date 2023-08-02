"use client";

import clsx from "clsx";
import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps {
  label: string;
  id: string;
  type?: string;
  required?: boolean;
  register: UseFormRegister<FieldValues>;
  errors: FieldErrors;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  id,
  type,
  required,
  register,
  errors,
  disabled,
}) => {
  console.log(label);
  return (
    <div>
      <label
        className="
      block
      text-sm
      font-medium
      leading-6
      text-gray-100
      "
        htmlFor={id}
      >
        {label}
      </label>
      <div>
        <input
          id={id}
          type={type}
          autoComplete={id}
          {...register(id, { required })}
          className={clsx(`
          form-input
          block
          w-full
          rounded-md
          border-0
          py-1.5text-gray-100
          shadow-sm
          ring-1
          ring-inset
          bg-zinc-400
          placeholder:text-gray-400
          focus:ring-2
          focus-ring-inset
          focus:ring-sky-600
          sm:text-sm
          sm:leading-6`,
            errors[id] && "focus:ring-rose-500",
            disabled && "opacitu-50 cursor-default"
          )}
        />
      </div>
    </div>
  );
};

export default Input;
