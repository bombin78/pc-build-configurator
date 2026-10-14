'use server'

import { signIn } from "@/auth";
import { AuthError } from "next-auth";

export type LoginState = { error?: string }

export async function loginAction(
    _prevState: LoginState | null,
    formData: FormData
): Promise<LoginState> {
    const login = String(formData.get('login')).trim();
    const password = String(formData.get('password')).trim();

    if(!login || !password) {
        return { error: 'Введите логин и пароль'};
    }

    try {
        return await signIn('credentials', {
            login,
            password,
            redirectTo: "/dashboard"
        });
    } catch (error) {
        if (error instanceof AuthError) {
            if (error.type === 'CredentialsSignin') {
                return { error: 'Неверный логин или пароль'};
            }

            return { error: 'Ошибка авторизации'};
        }
        
        throw error;
    }
}
