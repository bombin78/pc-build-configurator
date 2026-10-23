"use client"

import { getTabValue } from "@/lib/utils";
import { Session } from "next-auth";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";
import { LayoutList, LogOut, Plus, Users } from "lucide-react";
import { signOut } from "next-auth/react";

type Props = {
    session: Session | null
}

export function HeaderNav({ session }: Props) {
    const pathname = usePathname();
    const tabValue = getTabValue(pathname);

    if (!session?.user) {
        return (
            <div className="flex justify-end">
                <Button variant="secondary" asChild>
                    <Link href="/login">Войти</Link>
                </Button>
            </div>
        );
    }

    // aria-label называет вкладку, когда подпись скрыта.
    return (
        <div className="flex items-center gap-2">
            <div className="flex min-w-0 flex-1 justify-center">
                <Tabs value={tabValue} className="w-fit">
                    <TabsList>
                        <TabsTrigger value="dashboard" asChild>
                            <Link href="/dashboard" aria-label="Создать сборку">
                                <Plus className="h-4 w-4"/>
                                <span className="hidden md:inline">Создать сборку</span>
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="builds" asChild>
                            <Link href="/builds" aria-label="Мои сборки">
                                <LayoutList className="h-4 w-4"/>
                                <span className="hidden md:inline">Мои сборки</span>
                            </Link>
                        </TabsTrigger>
                        <TabsTrigger value="explore" asChild>
                            <Link href="/builds/explore" aria-label="Публичные сборки">
                                <Users className="h-4 w-4"/>
                                <span className="hidden md:inline">Публичные сборки</span>
                            </Link>
                        </TabsTrigger>
                    </TabsList>
                </Tabs>
            </div>
            <div className="flex shrink-0 justify-end">
                <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    aria-label="Выйти"
                    onClick={() => signOut({ redirectTo: '/' })}
                >
                    <LogOut className="h-4 w-4"/>
                    <span className="hidden sm:inline">Выйти</span>
                </Button>
            </div>
        </div>
    );
}
