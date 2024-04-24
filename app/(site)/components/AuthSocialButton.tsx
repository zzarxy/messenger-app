import { IconType } from "react-icons";

interface AuthSocialButtonProps {
   icon: IconType;
   onClick: () => void;
   children?: React.ReactNode;
}

const AuthSocialButton: React.FC<AuthSocialButtonProps> = ({
   icon: Icon,
   onClick,
   children
}) => {
   return (
      <button
         type="button"
         onClick={onClick}
         className="
            px-3
            py-3
            rounded-md
            ring-1
            ring-gray-400
            w-full
            inline-flex
            justify-center
            items-center
            gap-2 
            transition-colors
            hover:bg-gray-100
         "
      >
         <Icon />
         {children}
      </button>
   );
}

export default AuthSocialButton;