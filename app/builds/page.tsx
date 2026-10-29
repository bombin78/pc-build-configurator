import { auth } from "@/auth";
import { getMyBuilds } from "@/lib/builds";
import { redirect } from "next/navigation";
import { BuildCard } from "./components/builds-card";
import { DeleteBuildButton } from "./components/delete-build-button";
import { deleteBuildAction, setBuildPublicAction } from "./actions";
import { LayoutList, Share2 } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyBuilds } from "./components/empty-builds";
import { Button } from "@/components/ui/button";

export default async function MyBuilds() {
    const session = await auth();

    if (!session?.user.id) {
        redirect('/login');
    }

    const builds = await getMyBuilds(session.user.id);

    return (
        <div className="py-8">
            <PageHeader icon={LayoutList} title="Мои сборки"/>
            {
                builds.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            builds.map((build) => (
                                <BuildCard
                                    key={build.id}
                                    build={build}
                                >
                                    <DeleteBuildButton buildId={build.id} buildName={build.name} deleteAction={deleteBuildAction}/>
                                    <form action={setBuildPublicAction} className="contents">
                                        <input type="hidden" name="buildId" value={build.id}/>
                                        <input type="hidden" name="isPublic" value={build.isPublic ? "false" : "true"} />
                                        <Button
                                            type="submit"
                                            variant={build.isPublic ? 'default' : 'outline'}
                                            size="icon-sm"
                                            aria-label={build.isPublic ? 'Убрать сборку из публичных' : 'Сделать сборку публичной'}
                                            aria-pressed={build.isPublic}
                                        >
                                            <Share2 className={`h-4 w-4 ${build.isPublic ? 'fill-background' : 'stroke-primary'}`}/>
                                        </Button>
                                    </form>
                                </BuildCard>
                            ))
                        }
                    </div>
                ) : (
                    <EmptyBuilds icon={LayoutList}>Пока нет сохраненных сборок</EmptyBuilds>
                )
            }
        </div>
    );
}
