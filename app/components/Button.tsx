'use client'

import clsx from "clsx";

interface ButtonProps {
   type?: "button" | "submit" | "reset" | undefined;
   fullWidth?: boolean;
   children?: React.ReactNode;
   onClick?: () => void;
   secondary?: boolean;
   danger?: boolean;
   disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
   type,
   fullWidth,
   children,
   onClick,
   secondary,
   danger,
   disabled,
}) => {
   return (
      <button
         type={type}
         onClick={onClick}
         disabled={disabled}
         className={clsx(`
            bg-buttoncolor
            hover:bg-buttonhover 
            transition-colors
            text-white
            px-3
            py-3
            rounded-md
        `,
            disabled && "opacity-50 cursor-default",
            fullWidth && "w-full",
            secondary ? 'text-gray-900' : 'text-white',
            danger && 'bg-rose-500 hover:bg-rose-600 focus-visible:ring-rose-500',
            !secondary && !danger && 'bg-sky-500 hover:bg-sky-600 focus-visible:outline-sky-600'
         )}
      >
         {children}
      </button>
   );
}

export default Button;