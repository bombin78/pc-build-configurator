import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
    name: string;
    price: number;
    onClick?: () => void;
}

export function ComponentCard({
    name,
    price,
    onClick
}: Props) {
    return (
        <Card size="sm" className="transition-shadow hover:ring-primary/50">
            <CardHeader className="min-h-0 flex-1 pb-2">
                <CardTitle className="text-base font-medium leading-tight">{name}</CardTitle>
                <CardDescription className="text-base font-bold text-foreground tabular-nums">
                    { new Intl.NumberFormat('ru-RU').format(price) }
                </CardDescription>
            </CardHeader>
            <CardFooter>
                <Button
                    variant="outline"
                    size="sm"
                    className="w-full gap-1.5"
                    onClick={onClick}
                >
                    <Plus className="h-4 w-4"/>
                    Добавить
                </Button>
            </CardFooter>
        </Card>
    );
}
