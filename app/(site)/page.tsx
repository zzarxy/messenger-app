import AuthForm from "./components/AuthForm";

export default function Home() {
  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-zinc-800">
      <div>
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-100">
          Sign in to your account
        </h2>
        <AuthForm />
      </div>
    </div>
  );
}
