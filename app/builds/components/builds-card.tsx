'use client'
import { Button } from "@/components/ui/button";
import { Card, CardAction, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Pencil } from "lucide-react";
import Link from "next/link";

type BuildCard = {
    user: {
        login: string;
    };
    id: string;
    name: string;
    totalPrice: number;
    createdAt: Date | null;
    components: Array<{
        id: string;
        component: {
            name: string
        }
    }>
}

type Props = {
    build: BuildCard,
    children?: React.ReactNode
}

export function BuildCard({
    build,
    children
}: Props) {
    return (
        <Card className="flex flex-col transition-shadow hover:ring-primary/50">
            <CardHeader>
                <CardTitle className="min-w-0 text-xl font-extrabold tracking-tight wrap-break-word">
                    {build.name}
                </CardTitle>
                <CardDescription className="text-xs">
                    Создал: { build.user?.login}
                </CardDescription>
                <CardAction>
                    <Button variant="outline" size="icon" aria-label={`Редактировать сборку ${build.name}`} asChild>
                        <Link href={`/builds/${build.id}/edit`}><Pencil className="h-4 w-4 stroke-primary"/></Link>
                    </Button>
                </CardAction>
            </CardHeader>
            <CardContent className="flex-1">
                {
                    build.components.length > 0 && (
                        <>
                            <p className="text-sm font-medium">Компоненты:</p>
                            <ul className="mt-1 space-y-0.5 text-sm text-muted-foreground list-disc list-inside marker:text-primary">
                                {
                                    build.components.map((item) => (
                                        <li key={item.id}>{item.component.name}</li>
                                    ))
                                }
                            </ul>
                        </>
                    )
                }
            </CardContent>
            <CardFooter className="flex flex-wrap items-end justify-between gap-2">
                <div className="tabular-nums">
                    <p className="text-2xl font-extrabold tracking-tight">
                        {new Intl.NumberFormat('ru-Ru').format(build.totalPrice)}
                    </p>
                    {
                        build.createdAt && (
                            <p className="text-xs text-muted-foreground">{
                                new Intl.DateTimeFormat('ru-Ru').format(build.createdAt)
                            }</p>
                        )
                    }
                </div>
                <div className="flex flex-row items-center gap-2">
                    { children }
                </div>
            </CardFooter>
        </Card>
    );
}
