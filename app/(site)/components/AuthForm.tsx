"use client";

import axios from "axios";
import { BsGithub, BsGoogle } from "react-icons/bs";

import Button from "@/app/components/Button";
import Input from "@/app/components/inputs/Input";
import { useCallback, useEffect, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import AuthSocialButton from "./AuthSocialButton";
import { toast } from "react-hot-toast";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import clsx from "clsx";

type Variant = "LOGIN" | "REGISTER";

const AuthForm = () => {
   const session = useSession();
   const router = useRouter();
   const [variant, setVariant] = useState<Variant>("LOGIN");
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<String>();

   useEffect(() => {
      if (session?.status === "authenticated") {
         router.push('/users')
      }
   }, [session?.status, router])

   const toggleVariant = useCallback(() => {
      if (variant === "LOGIN") {
         setVariant("REGISTER");
      } else {
         setVariant("LOGIN");
      }
   }, [variant]);

   const {
      register,
      handleSubmit,
      formState: { errors },
   } = useForm<FieldValues>({
      defaultValues: {
         name: "",
         email: "",
         password: "",
      },
   });

   const onSubmit: SubmitHandler<FieldValues> = (data) => {
      setIsLoading(true);

      if (variant === "REGISTER") {
         axios.post('/api/register', data)
            .then(() => signIn('credentials', data))
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false))
      }

      if (variant === "LOGIN") {
         signIn('credentials', {
            ...data,
            redirect: false,
         })
            .then((callback) => {
               if (callback?.error) {
                  toast.error(callback.error)
               }
               if (callback?.ok && !callback?.error) {
                  toast.success('Logged in successfully!')
               }
            })
            .finally(() => setIsLoading(false))
      }
   };

   const socialAction = (action: string) => {
      setIsLoading(true);

      signIn(action, { redirect: false })
         .then((callback) => {
            if (callback?.error) {
               toast.error(callback.error)
            }
            if (callback?.ok && !callback?.error) {
               toast.success('Logged in successfully!')
               router.push('/users')
            }
         })
         .finally(() => setIsLoading(false))
   };

   return (
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
         <div className="bg-white px-4 py-8 sm:rounded-xl sm:shadow-lg sm:px-10">
            <form className={clsx("space-y-6 w-full transition-all duration-200 ease-out",
               variant === "REGISTER" && "h-60", error && "h-auto")} onSubmit={handleSubmit(onSubmit)}>
               {variant === "REGISTER" &&
                  <Input
                     id="name"
                     label="Name"
                     register={register}
                     errors={errors}
                     disabled={isLoading}
                  />
               }
               <Input
                  id="email"
                  type="email"
                  label="Email address"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
               />
               <Input
                  id="password"
                  type="password"
                  label="Your password"
                  register={register}
                  errors={errors}
                  disabled={isLoading}
               />
               <Button
                  fullWidth
                  disabled={isLoading}
               >
                  {variant === "LOGIN" ? "Sign in" : "Register"}
               </Button>
               <div className=" text-center text-red-600">
                  {error}
               </div>
            </form>
            <div className="mt-6">
               <div className="flex">
                  <div className="w-full flex items-center">
                     <div className="w-full border-t border-gray-400" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                     <span className="px-2 text-gray-400 whitespace-nowrap">
                        Or continue with
                     </span>
                  </div>
                  <div className="w-full flex items-center">
                     <div className="w-full border-t border-gray-400" />
                  </div>
               </div>
               <div className="mt-6 flex flex-col gap-4">
                  <AuthSocialButton
                     icon={BsGithub}
                     onClick={() => socialAction("github")}
                  >Github</AuthSocialButton>
                  <AuthSocialButton
                     icon={BsGoogle}
                     onClick={() => socialAction("google")}
                  >Google</AuthSocialButton>
               </div>
            </div>
            <div className="flex mt-6 justify-center gap-2 text-sm text-gray-700">
               <div>
                  {variant === "LOGIN" ? "Don't have an account?" : "Already have an account?"}
               </div>
               <div
                  onClick={toggleVariant}
                  className="underline cursor-pointer"
               >
                  {variant === "LOGIN" ? "Create an account" : "Login"}
               </div>
            </div>
         </div>
      </div>
   );
};

export default AuthForm;
