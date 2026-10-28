import type { LucideIcon } from "lucide-react";

type Props = {
    icon: LucideIcon,
    title: React.ReactNode,
    action?: React.ReactNode,
}

export function PageHeader({ icon: Icon, title, action }: Props) {
    return (
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border">
                    <Icon className="size-5 stroke-primary"/>
                </div>
                <h1 className="min-w-0 scroll-m-20 text-3xl font-extrabold tracking-tight text-balance wrap-break-word lg:text-4xl">
                    {title}
                </h1>
            </div>
            {action}
        </div>
    );
}
