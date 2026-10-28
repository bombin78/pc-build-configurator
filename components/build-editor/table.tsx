'use client'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table';
import { Dialog } from '@/components/ui/dialog';

import { Component, ComponentCategory, SelectedByCategory } from "@/lib/types";
import { Box, Cpu, Fan, HardDrive, MemoryStick, Monitor, Plus, Server, Zap } from "lucide-react";
import { memo, useState } from "react";
import { Button } from '@/components/ui/button';
import { AddComponentDialogContent } from './add-component-dialog';
import { InfoTooltip } from '@/components/info-tooltip';

const iconMap: Record<ComponentCategory['icon'], React.ElementType> = {
    Cpu,
    Monitor,
    Server,
    MemoryStick,
    HardDrive,
    Zap,
    Box,
    Fan
};

type CategoryRow = {
    id: string;
    name: string;
    icon: string;
}

type Props = {
    components: CategoryRow[];
    selectedByCategory: SelectedByCategory;
    onSelectedComponent: (categoryId: string, component: Component | null) => void
}

const formatPrice = (price: number) => new Intl.NumberFormat('ru-Ru').format(price);

export const TableParts = memo(function TableParts({
    components,
    selectedByCategory,
    onSelectedComponent
}: Props){
    const [openCategoryId, setOpenCategoryId] = useState<string | null>(null);

    const totalPrice = Object.values(selectedByCategory).reduce(
        (sum, component) => sum + (component?.price ?? 0),
        0
    );

    const openCategory = components.find(category => category.id === openCategoryId);

    const renderSelectButton = (categoryId: string, selected: Component | null | undefined) => (
        <Button variant="outline" size="sm" onClick={() => setOpenCategoryId(categoryId)}>
            <Plus className='h-4 w-4 mr-1'/>
            { selected ? 'Изменить' : 'Добавить'}
        </Button>
    );

    return (
        <>
            <div className="flex flex-col gap-3 md:hidden">
                {
                    components.map(category => {
                        const Icon = iconMap[category.icon];
                        const selected = selectedByCategory[category.id];

                        return (
                            <div key={category.id} className="rounded-lg border p-3">
                                <div className="flex items-center justify-between gap-2">
                                    <div className="flex min-w-0 items-center gap-2 font-bold">
                                        <Icon className="h-5 w-5 shrink-0 stroke-primary"/>
                                        <span className="min-w-0">{category.name}</span>
                                        <InfoTooltip>
                                            {category.id}
                                        </InfoTooltip>
                                    </div>
                                    {renderSelectButton(category.id, selected)}
                                </div>
                                <div className="mt-2 flex items-baseline justify-between gap-2 text-sm">
                                    <span className="min-w-0 wrap-break-word">{selected?.name ?? '-'}</span>
                                    <span className="shrink-0 tabular-nums">
                                        {selected ? formatPrice(selected.price) : '-'}
                                    </span>
                                </div>
                            </div>
                        );
                    })
                }
                <div className="flex items-baseline justify-between gap-2 rounded-lg border bg-muted/50 p-3">
                    <p className="font-medium">Цена сборки:</p>
                    <p className="text-2xl font-extrabold tracking-tight tabular-nums">{formatPrice(totalPrice)}</p>
                </div>
            </div>

            <div className="hidden overflow-hidden rounded-lg border md:block">
                <Table className="[&_td:first-child]:pl-4 [&_td:last-child]:pr-4 [&_th:first-child]:pl-4 [&_th:last-child]:pr-4">
                    <TableHeader>
                        <TableRow>
                            <TableHead className='w-[100px]'>Компонент</TableHead>
                            <TableHead>Тип</TableHead>
                            <TableHead>Модель</TableHead>
                            <TableHead>Цена</TableHead>
                            <TableHead className='text-right'>Действия</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {
                            components.map(category => {
                                const Icon = iconMap[category.icon];
                                const selected = selectedByCategory[category.id];

                                return (
                                    <TableRow key={category.id} className='my-2'>
                                        <TableCell>
                                            <div className="flex items-center">
                                                <Icon className="h-5 w-5 mr-1 stroke-primary"/>
                                            </div>
                                        </TableCell>
                                        <TableCell className='font-bold'>
                                            {category.name}
                                                <InfoTooltip>
                                                    {category.id}
                                                </InfoTooltip>
                                            </TableCell>
                                        <TableCell>{selected?.name ?? '-'}</TableCell>
                                        <TableCell className="tabular-nums">{selected ? formatPrice(selected.price) : '-'}</TableCell>
                                        <TableCell className='text-right'>
                                            {renderSelectButton(category.id, selected)}
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={5}>
                                <div className="flex items-baseline justify-between gap-4">
                                    <p className="font-medium">Цена сборки:</p>
                                    <p className="text-2xl font-extrabold tracking-tight tabular-nums">
                                        {formatPrice(totalPrice)}
                                    </p>
                                </div>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            {/* Модальное окно "Добавить компонент - ..." */}
            <Dialog
                open={openCategory !== undefined}
                onOpenChange={(open) => { if (!open) setOpenCategoryId(null); }}
            >
                {
                    openCategory && (
                        <AddComponentDialogContent
                            key={openCategory.id}
                            categoryId={openCategory.id}
                            categoryName={openCategory.name}
                            icon={iconMap[openCategory.icon]}
                            onSelect={
                                (component) => {
                                    onSelectedComponent(openCategory.id, component);
                                    setOpenCategoryId(null)
                                }
                            }
                        />
                    )
                }
            </Dialog>
        </>
    )
});
