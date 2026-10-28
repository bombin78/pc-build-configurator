import { auth } from "@/auth";
import { SignupForm } from "@/components/signup-form"
import { redirect } from "next/navigation";
import { generateUniqueLogin } from "@/lib/login";

export default async function Page() {
  const session = await auth();
  
  if (session?.user) {
    redirect('/dashboard');
  }

  // Логин создаётся при каждом открытии страницы, чтобы сразу показать его
  // в форме. Страница не кэшируется: auth() читает cookie запроса
  const login = await generateUniqueLogin();

  return (
    <div className="flex w-full flex-1 items-center justify-center px-4 py-10 sm:px-6">
      <div className="w-full max-w-sm">
        <SignupForm login={login} />
      </div>
    </div>
  )
}
