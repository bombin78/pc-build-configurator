import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { prisma } from '@/lib/db';
import bcrypt from "bcryptjs";

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true,
    secret: process.env.NEXTAUTH_SECRET,
    // здесь идет перечисление вариантов аутентификации
    providers: [
        // у нас будет только один вариант через форму по логину и паролю
        Credentials({
            credentials: {
                login: {
                    label: 'Логин',
                    type: 'text'
                },
                password: {
                    label: 'Пароль',
                    type: 'password'
                }
            },
            async authorize(credentials) {
                if (!credentials?.login || typeof credentials.login !== 'string') {
                    return null;
                }

                if (!credentials?.password || typeof credentials.password !== 'string') {
                    return null;
                }

                const user = await prisma.user.findUnique({
                    where: { login: credentials.login }
                })
    
                if (!user?.password) {
                    return null;
                }

                const valid = await bcrypt.compare(credentials.password, user.password);

                if (!valid) {
                    return null;
                }

                return {
                    id: user.id,
                    login: user.login
                };
            },
        })
    ],
    // Какая будет сессия создаваться
    session: { strategy: 'jwt'},
    // Указываем свои страницы
    pages: {
        signIn: "/login"
    },
    callbacks: {
        // jwt решает, что сохранить в куке
        jwt({ token, user}) {
            if (user) {
                token.id = user.id;
                token.login = user.login;
            }

            return token;
        },
        // session решает, что из токена отдать коду приложения
        session({ session, token}) {
            if (session.user) {
                session.user.id = token.id;
                session.user.login = token.login;
            }

            return session;
        }
    }
});
