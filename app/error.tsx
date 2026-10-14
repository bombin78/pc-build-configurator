'use client' // error.tsx должен быть клиентским компонентом

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

// Next.js показывает этот компонент вместо страницы, если при её отрисовке
// возникла ошибка. Шапка из app/layout.tsx остаётся на месте.
export default function Error({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string }
  unstable_retry: () => void
}) {
  return (
    <div className="flex flex-1 w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>Что-то пошло не так</CardTitle>
            <CardDescription>
              Страница не загрузилась из-за ошибки на сервере. Попробуйте ещё раз
              через минуту.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <div className="flex gap-2">
              <Button onClick={() => unstable_retry()}>Попробовать снова</Button>
              <Button variant="outline" asChild>
                <Link href="/">На главную</Link>
              </Button>
            </div>
            {/* По этому коду ошибку можно найти в выводе сервера: docker compose logs app */}
            {error.digest && (
              <p className="text-xs text-muted-foreground">
                Код ошибки: {error.digest}
              </p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
