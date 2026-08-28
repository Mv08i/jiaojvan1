import { type NextRequest } from "next/server";
import { updateSession } from "@/lib/supabase/middleware";

export async function middleware(request: NextRequest) {
  return await updateSession(request);
}

export const config = {
  matcher: [
    /*
     * 只匹配需要认证检查的路由，公开页面不走 middleware → 让 Vercel Edge 可以缓存它们
     * 公开路由（/ /login /support /privacy /terms /cookies /refunds）从这里排除
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$|$|login|support|privacy|terms|cookies|refunds).*)",
  ],
};
