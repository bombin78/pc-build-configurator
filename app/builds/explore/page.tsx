import { auth } from "@/auth";
import { getPublicBuild } from "@/lib/builds";
import { notFound } from "next/navigation";
import { BuildCard } from "../components/builds-card";
import { toggleLikeAction } from "../actions";
import { Button } from "@/components/ui/button";
import { ThumbsUp, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { EmptyBuilds } from "../components/empty-builds";

export default async function ExplorePage() {
    const session = await auth();

    if (!session?.user.id) {
        notFound();
    }

    const builds = await getPublicBuild(session.user.id);

    return (
        <div className="py-8">
            <PageHeader icon={Users} title="Публичные сборки"/>
            {
                builds.length > 0 ? (
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {
                            builds.map((build) => {
                                const isLiked = Array.isArray(build.likes) && build.likes.length > 0;

                                return (
                                    <BuildCard
                                        key={build.id}
                                        build={build}
                                    >
                                        <div className="flex flex-wrap gap-2">
                                            <form action={toggleLikeAction} className="contents">
                                                <input type="hidden" name="buildId" value={build.id}/>
                                                <Button
                                                    type="submit"
                                                    variant="outline"
                                                    size="sm"
                                                    aria-label={`Нравится: ${build._count.likes}`}
                                                    aria-pressed={isLiked}
                                                    className={isLiked ? 'text-primary' : ''}
                                                >
                                                    <ThumbsUp
                                                        className={`h-4 w-4 stroke-primary ${isLiked ? "fill-primary/20": ''}`}
                                                    />
                                                    {build._count.likes}
                                                </Button>
                                            </form>
                                        </div>
                                    </BuildCard>
                                )
                            })
                        }
                    </div>
                ) : (
                    <EmptyBuilds icon={Users}>Нет публичных сборок</EmptyBuilds>
                )
            }
        </div>
    );
}
