import { Button } from "@/components/ui/button";
import { HomeIllustration } from "@/components/home-illustration";
import Link from "next/link";

export default function Home() {
  return (
    <main className="flex w-full flex-1 items-center px-4 py-10 sm:px-6 lg:py-16">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance lg:text-5xl min-[75rem]:text-6xl">
            Собери свой ПК
          </h1>
          <p className="mt-4 max-w-xl text-lg text-pretty text-muted-foreground">
            Выбери процессор, видеокарту и остальные комплектующие — сайт
            посчитает цену сборки. Сохрани сборку, поделись ею и смотри,
            что собрали другие.
          </p>
          <Button size="lg" className="mt-8 h-11 px-6 text-base" asChild>
            <Link href="/dashboard">Собрать ПК</Link>
          </Button>
        </div>
        <HomeIllustration className="mx-auto max-w-md lg:max-w-none"/>
      </div>
    </main>
  );
}
