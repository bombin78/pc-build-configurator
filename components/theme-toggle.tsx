"use client"

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";

// Подписываться не на что: значение меняется один раз, после гидратации.
const subscribe = () => () => {};

export function ThemeToggle() {
    // На сервере и во время гидратации — false, после гидратации — true.
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);
    const { resolvedTheme, setTheme } = useTheme();

    // На сервере тема неизвестна: next-themes читает её из localStorage
    // в браузере. До гидратации держим пустое место размером с кнопку,
    // чтобы шапка не сдвигалась.
    if (!mounted) {
        return <div className="size-7 shrink-0"/>;
    }

    const isDark = resolvedTheme === "dark";

    return (
        <Button
            variant="ghost"
            size="icon-sm"
            type="button"
            aria-label={isDark ? "Включить светлую тему" : "Включить тёмную тему"}
            onClick={() => setTheme(isDark ? "light" : "dark")}
        >
            {isDark ? <Sun className="h-4 w-4"/> : <Moon className="h-4 w-4"/>}
        </Button>
    );
}
