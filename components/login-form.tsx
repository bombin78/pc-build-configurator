"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useActionState } from "react"
import { loginAction, LoginState } from "@/app/login/actions"
import { ErrorMessage } from "./error-message"
import { TEST_USER } from "@/lib/constants"
import { LogIn } from "lucide-react"
import Link from "next/link"

export function LoginForm({ className, ...props }: React.ComponentProps<typeof Card>) {
  const [state, formAction] = useActionState<LoginState | null, FormData>(loginAction, null);

  return (
    <Card className={cn("min-h-[32rem] sm:min-h-[31rem]", className)} {...props}>
      <CardHeader>
        <div className="mb-2 flex size-10 items-center justify-center rounded-lg border">
          <LogIn className="size-5 stroke-primary"/>
        </div>
        <CardTitle className="text-2xl font-extrabold tracking-tight">Войдите в свой аккаунт</CardTitle>
        <CardDescription>
          Введите логин и пароль, чтобы войти в свой аккаунт.
        </CardDescription>
        <p className="mt-2 rounded-lg border border-dashed border-primary/50 bg-primary/5 px-3 py-2 text-muted-foreground">
          Для знакомства с сайтом есть тестовый аккаунт: логин{" "}
          <b className="text-foreground">{TEST_USER.login}</b>, пароль{" "}
          <b className="text-foreground">{TEST_USER.password}</b>
        </p>
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
                placeholder="user-7f3k2q"
                autoComplete="username"
                required
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Пароль</FieldLabel>
              <Input
                id="password"
                type="password"
                name="password"
                autoComplete="current-password"
                required
              />
            </Field>
            {
              state?.error && <ErrorMessage message={state.error} />
            }
            <Field className="mt-auto">
              <Button type="submit" className="h-10 text-base">Войти</Button>
              <FieldDescription className="text-center">
                Нет аккаунта? <Link href="/signup" className="text-primary">Зарегистрироваться</Link>
              </FieldDescription>
            </Field>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
