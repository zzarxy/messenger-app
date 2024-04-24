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
   return (
         <input
            placeholder={label}
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
               py-2
               text-gray-900
               shadow-sm
               bg-gray-200
               placeholder:text-gray-500
               hover:ring-1
               hover:ring-gray-300
               focus:ring-1
               focus:ring-buttoncolor
               sm:text-sm
               sm:leading-6`,
               errors[id] && "focus:ring-rose-500",
               disabled && "opacitu-50 cursor-default"
            )}
         />
   );
};

export default Input;
