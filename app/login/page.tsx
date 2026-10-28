import { auth } from "@/auth";
import { LoginForm } from "@/components/login-form";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await auth();

  if (session?.user) {
    redirect('/dashboard');
  }

  return (
    <div className="flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm">
        <LoginForm />
      </div>
    </div>
  )
}
