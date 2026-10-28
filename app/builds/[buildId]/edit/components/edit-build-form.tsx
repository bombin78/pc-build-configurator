'use client'


import { useCallback, useMemo, useState } from "react";
import { SaveBuildDialog } from "@/components/build-editor/save-build-dialog";
import { TableParts } from "@/components/build-editor/table";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/page-header";
import { Pencil } from "lucide-react";
import { componentCategories } from "@/lib/constants";
import { Component, dbTypeToCategoryId, SelectedByCategory } from "@/lib/types";
import { updateBuildAction } from "@/lib/actions/builds";

type BuildComponentInput = {
    id: string;
    name: string;
    price: number;
    type: Component['type'];
    socket: string | null;
}

type Props = {
    buildId: string;
    buildName: string;
    buildComponents: BuildComponentInput[];
}

function buildInitialSelected(
    buildComponents: BuildComponentInput[],
): SelectedByCategory {
    const selected: SelectedByCategory = {};

    for (const component of buildComponents) {
        const categoryId = dbTypeToCategoryId[component.type];

        if (categoryId) {
            selected[categoryId] = {
                id: component.id,
                name: component.name,
                price: component.price,
                type: component.type,
                socket: component.socket
            };
        }
    }

    return selected;
}

export function EditBuildForm({
    buildId,
    buildName,
    buildComponents
}: Props) {
    const initialSelected = useMemo(() => {
        return buildInitialSelected(buildComponents)
    }, [buildComponents]);

    const [selectedByCategory, setSelectedByCategory] = useState<SelectedByCategory>(initialSelected);
    const [saveDialogOpen, setSaveDialogOpen] = useState(false);

    const onSelectedComponent = useCallback(
        (categoryId: string, component: Component | null) => {
            setSelectedByCategory((prev) => ({
                ...prev,
                [categoryId]: component
            }));
        }
    , []);

    return (
        <>
            <PageHeader
                icon={Pencil}
                title={<>Редактирование сборки - { buildName }</>}
                action={
                    <Button
                        className="h-10 px-5 text-base"
                        onClick={() => setSaveDialogOpen(true)}
                    >
                        Сохранить
                    </Button>
                }
            />
            <TableParts
                components={componentCategories}
                selectedByCategory={selectedByCategory}
                onSelectedComponent={onSelectedComponent}
            />
            <SaveBuildDialog
                open={saveDialogOpen}
                onOpenChange={setSaveDialogOpen}
                selectedByCategory={selectedByCategory}
                defaultName={buildName}
                redirectPath="/builds"
                action={updateBuildAction.bind(null, buildId)}
            />
        </>
    );
}
