'use client'

import { useCallback, useState } from "react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Plus } from "lucide-react";
import type { Component, SelectedByCategory } from "@/lib/types";
import { componentCategories } from "@/lib/constants";
import { TableParts } from "@/components/build-editor/table";
import { SaveBuildDialog } from "@/components/build-editor/save-build-dialog";
import { createBuildAction } from "@/lib/actions/builds";

export const CurrentBuild = () => {
    const [selectedByCategory, setSelectedByCategory] = useState<SelectedByCategory>({});
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);

    const onSelectComponent = useCallback((categoryId: string, component: Component | null) => {

        setSelectedByCategory(prev => ({...prev, [categoryId]: component}));
    },[]);

    const hasSelected = Object.values(selectedByCategory).some(Boolean);

    return (
        <>
            <PageHeader
                icon={Plus}
                title="Собери свою сборку"
                action={
                    // Кнопка открывающая модальное окно "Сохранить сборку"
                    <Button className="h-10 px-5 text-base" disabled={!hasSelected} onClick={() => setSaveDialogOpen(true)}>Собрать</Button>
                }
            />
            <div className="min-w-0 overflow-x-auto">
                {/* Таблица выбора компонентов */}
                <TableParts
                    components={componentCategories}
                    onSelectedComponent={onSelectComponent}
                    selectedByCategory={selectedByCategory}
                />
                {/* Модальное окно "Сохранить сборку" */}
                <SaveBuildDialog
                    open={saveDialogOpen}
                    onOpenChange={setSaveDialogOpen}
                    selectedByCategory={selectedByCategory}
                    action={createBuildAction}
                />
            </div>
        </>
    );
}
