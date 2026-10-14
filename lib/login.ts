import { randomInt } from "node:crypto";
import { prisma } from "./db";

const LOGIN_PREFIX = 'user-';
const LOGIN_ALPHABET = 'abcdefghijklmnopqrstuvwxyz0123456789';
const LOGIN_RANDOM_LENGTH = 6;

// Логин создаёт сайт, пользователь его не придумывает.
// Так в логине не окажется имени или email, то есть персональных данных.
export const GENERATED_LOGIN_REGEX = /^user-[a-z0-9]{6}$/;

function randomLogin(): string {
    let suffix = '';

    for (let i = 0; i < LOGIN_RANDOM_LENGTH; i++) {
        suffix += LOGIN_ALPHABET[randomInt(LOGIN_ALPHABET.length)];
    }

    return LOGIN_PREFIX + suffix;
}

// Вариантов логина около 2,2 миллиарда, поэтому свободный находится
// с первой попытки. Ограничение нужно, чтобы не зациклиться, если логины кончатся
const MAX_LOGIN_ATTEMPTS = 10;

// Возвращает логин вида "user-7f3k2q", которого ещё нет в базе
export async function generateUniqueLogin(): Promise<string> {
    for (let attempt = 0; attempt < MAX_LOGIN_ATTEMPTS; attempt++) {
        const login = randomLogin();
        const existing = await prisma.user.findUnique({
            where: { login }
        });

        if (!existing) {
            return login;
        }
    }

    throw new Error(`Не удалось подобрать свободный логин за ${MAX_LOGIN_ATTEMPTS} попыток`);
}
