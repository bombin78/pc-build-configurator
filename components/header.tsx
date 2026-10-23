import { auth } from "@/auth";
import Link from "next/link";
import { Cpu } from "lucide-react";
import { TypographyH3 } from "./ui/typography-h3";
import { HeaderNav } from "./header-nav";

export async function Header() {
    const session = await auth();

    return (
        <header className="flex w-full items-center gap-2 px-4 py-4 sm:gap-4 sm:px-6">
            <div className="shrink-0">
                <TypographyH3>
                    <Link
                        href={session?.user ? '/dashboard' : '/'}
                        className="flex items-center gap-2"
                    >
                        <Cpu className="size-6 shrink-0"/>
                        <span className="lg:hidden">PC Build</span>
                        <span className="hidden lg:inline">PC Build Configurator</span>
                    </Link>
                </TypographyH3>
            </div>
            <nav className="min-w-0 flex-1">
                <HeaderNav session={session}/>
            </nav>
        </header>
    );
}
