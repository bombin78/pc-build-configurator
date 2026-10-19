import { prisma } from "@/lib/db";

// Ответ вычисляется при каждом запросе, а не один раз при next build
export const dynamic = "force-dynamic";

// GET /api/health: 200, если приложение работает и база отвечает, иначе 503
export async function GET() {
    try {
        await prisma.$queryRaw`SELECT 1`;
        return Response.json({ status: "ok" });
    } catch {
        return Response.json({ status: "error" }, { status: 503 });
    }
}
