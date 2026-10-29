import type { LucideIcon } from "lucide-react";

type Props = {
    icon: LucideIcon,
    children: React.ReactNode,
}

// Пустой список сборок: синий пунктир, как у свободных мест на иллюстрации
// главной и у плашки с тестовым аккаунтом на входе.
export function EmptyBuilds({ icon: Icon, children }: Props) {
    return (
        <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-primary/50 bg-primary/5 px-4 py-10 text-center text-muted-foreground">
            <Icon className="size-8 stroke-primary"/>
            <p>{children}</p>
        </div>
    );
}
