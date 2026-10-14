"use client"

import { signupAction, SignupState } from "@/app/signup/actions";
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

type Props = React.ComponentProps<typeof Card> & {
  login: string
}

export function SignupForm({ login, ...props }: Props) {
  const [state, formAction] = useActionState<SignupState | null, FormData>(signupAction, null);

  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Создать аккаунт</CardTitle>
        <CardDescription>
          Придумайте пароль, чтобы создать учетную запись.
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
                value={login}
                autoComplete="username"
                readOnly
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
            <FieldGroup>
              <Field>
                <Button type="submit">Создать аккаунт</Button>
                <FieldDescription className="px-6 text-center">
                  У вас уже есть аккаунт? <a href="/login">Войти</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
