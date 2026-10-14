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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [state, formAction] = useActionState<LoginState | null, FormData>(loginAction, null);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Войдите в свой аккаунт</CardTitle>
          <CardDescription>
            Введите логин и пароль, чтобы войти в свой аккаунт.
            Для знакомства с сайтом есть тестовый аккаунт: логин{" "}
            <b>{TEST_USER.login}</b>, пароль <b>{TEST_USER.password}</b>
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={formAction}>
            <FieldGroup>
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
              <Field>
                <Button type="submit">Войти</Button>
                <FieldDescription className="text-center">
                  Нет аккаунта? <a href="/signup">Зарегистрироваться</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
