'use client'

import { DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Component } from "@/lib/types";
import { useEffect, useState } from "react";
import { ComponentCard } from "./component-card";
import { getComponentsByCategory } from "@/lib/actions/components";

type Props = {
    categoryId: string;
    categoryName: string;
    icon: React.ElementType;
    onSelect: (component: Component) => void
}

export function AddComponentDialogContent({
    categoryId,
    categoryName,
    icon: Icon,
    onSelect
}: Props) {
    const [components, setComponents] = useState<Component[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getComponentsByCategory(categoryId)
            .then(
                (data) => {
                    setComponents(data);
                    setLoading(false);
             })
    }, [categoryId])

    // 56rem - ширина max-w-4xl. min() оставляет по 1rem по бокам.
    return (
        <DialogContent className="sm:max-w-[min(56rem,calc(100%-2rem))] max-h-[85vh] overflow-hidden flex flex-col">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-3 pr-6 text-lg font-bold tracking-tight">
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-md border">
                        <Icon className="size-4 stroke-primary"/>
                    </span>
                    Добавить компонент - {categoryName}
                </DialogTitle>
            </DialogHeader>
            <div className="overflow-y-auto flex-1 mx-1 p-1">
                {
                    components.length > 0 ? (
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                            {
                                components.map((component) => (
                                    <ComponentCard
                                        key={component.id}
                                        name={component.name}
                                        price={component.price}
                                        onClick={() => onSelect(component)}
                                    />
                                ))
                            }
                        </div>
                    ) : (
                        <p className="text-muted-foreground text-sm py-4">
                            { loading ? 'Загрузка' : 'Нет доступных компонентов'}
                        </p>
                    )
                }
            </div>
        </DialogContent>
    );
}
