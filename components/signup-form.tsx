"use client"

import { signupAction, SignupState } from "@/app/signup/actions";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import { ErrorMessage } from "./error-message";
import { UserPlus } from "lucide-react";
import Link from "next/link";

type Props = React.ComponentProps<typeof Card> & {
  login: string
}

export function SignupForm({ login, className, ...props }: Props) {
  const [state, formAction] = useActionState<SignupState | null, FormData>(signupAction, null);

  return (
    <Card className={cn("min-h-[32rem] sm:min-h-[31rem]", className)} {...props}>
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg border">
          <UserPlus className="size-5 stroke-primary"/>
        </div>
        <CardTitle className="text-2xl font-extrabold tracking-tight">Создать аккаунт</CardTitle>
        <CardDescription>
          Придумайте пароль, чтобы создать учетную запись.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col">
        <form action={formAction} className="flex flex-1 flex-col">
          <FieldGroup className="flex-1">
            <Field>
              <FieldLabel htmlFor="login">Логин</FieldLabel>
              <Input
                id="login"
                type="text"
                name="login"
                value={login}
                autoComplete="username"
                readOnly
                className="font-mono"
              />
              <FieldDescription>
                Логин создан автоматически. Сохраните его: восстановить логин нельзя.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input 
                id="password" 
                type="password"
                name="password" 
                autoComplete="new-password"
                required 
              />
              <FieldDescription>
                Пароль должен быть не менее 8 символов
              </FieldDescription>
            </Field>
            {
              state?.error && <ErrorMessage message={state.error}/>
            }
            <FieldGroup className="mt-auto">
              <Field>
                <Button type="submit" className="h-10 text-base">Создать аккаунт</Button>
                <FieldDescription className="px-6 text-center">
                  У вас уже есть аккаунт? <Link href="/login" className="text-primary">Войти</Link>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
