"use server"

import { redirect } from "next/navigation";
import {prisma} from "@/lib/db";
import bcrypt from "bcryptjs";
import { GENERATED_LOGIN_REGEX } from "@/lib/login";

const MIN_PASSWORD_LENGTH = 8;

export type SignupState = {error?: string};

function getString(formData: FormData, key: string): string | null {
  const value = formData.get(key);
  return typeof value === "string" ? value : null;
};

export async function signupAction(
	_prevState: SignupState | null,
	formData: FormData
): Promise<SignupState> {
	const login = getString(formData, 'login');
	const password = getString(formData, 'password');

	// Логин создаёт страница регистрации. Проверка формата не даёт
	// подменить его в запросе на свой, например на имя или email
	if (!login || !GENERATED_LOGIN_REGEX.test(login)) {
        return { error: 'Некорректный логин, обновите страницу'}
    }

    if(!password || password.length < MIN_PASSWORD_LENGTH) {
        return { error: 'Пароль должен быть не менее 8 символов'}
    }

	const existing = await prisma.user.findUnique({
		where: {login}
	});

	// Страница выдаёт только свободный логин. Сюда попадает запрос,
	// в котором логин подменили на чужой, или повторная отправка формы
	if (existing) {
        return { error: 'Этот логин уже занят, обновите страницу'}
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
        data: {
            login,
            password: hashedPassword
        }
    })

    redirect('/login');
}
