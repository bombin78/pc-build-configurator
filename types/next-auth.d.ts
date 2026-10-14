import { DefaultSession, DefaultUser } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            id: string,
            login: string
        } & DefaultSession
    }

    interface User extends DefaultUser {
        id: string,
        login: string
    }
}

declare module '@auth/core/jwt' {
    interface JWT {
        id: string,
        login: string
    }
}
