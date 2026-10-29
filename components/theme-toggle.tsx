"use client"

import { useState, useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

const iconSpin = "animate-in spin-in-90 fade-in-0 duration-300 ease-out";

// Подписываться не на что: значение меняется один раз, после гидратации.
const subscribe = () => () => {};

export function ThemeToggle() {
    // На сервере и во время гидратации — false, после гидратации — true.
    const mounted = useSyncExternalStore(subscribe, () => true, () => false);
    const { resolvedTheme, setTheme } = useTheme();
    // Значок поворачивается только после нажатия, а не при загрузке страницы
    const [clicked, setClicked] = useState(false);

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
            onClick={() => {
                setClicked(true);
                setTheme(isDark ? "light" : "dark");
            }}
        >
            {/* Sun и Moon — разные компоненты, поэтому при смене темы новый значок
                появляется заново и анимация запускается ещё раз */}
            {isDark
                ? <Sun className={cn("h-4 w-4", clicked && iconSpin)}/>
                : <Moon className={cn("h-4 w-4", clicked && iconSpin)}/>}
        </Button>
    );
}
