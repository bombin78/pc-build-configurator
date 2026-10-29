'use client'

import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useTransition } from "react";

type Props = {
    buildId: string;
    buildName: string;
    deleteAction: (formData: FormData) => void;
}

export function DeleteBuildButton({
    buildId,
    buildName,
    deleteAction
}: Props) {
    const [isPending, startTransition] = useTransition();

    // После удаления revalidatePath убирает карточку со страницы,
    // а вместе с ней и это окно, поэтому закрывать его отдельно не нужно
    const handleDelete = () => {
        const formData = new FormData();
        formData.set('buildId', buildId);

        startTransition(() => deleteAction(formData));
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button type="button" variant="destructive" size="sm">
                    Удалить
                </Button>
            </DialogTrigger>
            <DialogContent showCloseButton={false}>
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3 text-lg font-bold tracking-tight">
                        <span className="flex size-8 shrink-0 items-center justify-center rounded-md border">
                            <Trash2 className="size-4 stroke-destructive"/>
                        </span>
                        Удалить сборку?
                    </DialogTitle>
                    <DialogDescription className="wrap-break-word">
                        Сборка «{buildName}» будет удалена без возможности восстановления.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline" className="h-10 px-5 text-base" disabled={isPending}>
                            Отмена
                        </Button>
                    </DialogClose>
                    <Button
                        variant="destructive"
                        className="h-10 px-5 text-base"
                        disabled={isPending}
                        onClick={handleDelete}
                    >
                        Удалить
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
