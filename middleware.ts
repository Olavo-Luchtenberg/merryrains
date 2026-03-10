import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

// Redireciona "/" para /biblioteca quando logado; protege /livro e /biblioteca
export async function middleware(req: NextRequest) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  })

  const path = req.nextUrl.pathname

  // Se logado em / ou /login, redireciona (respeitando callbackUrl para /checkout)
  if (token && (path === "/" || path === "/login")) {
    const callbackUrl = req.nextUrl.searchParams.get("callbackUrl")
    const target = callbackUrl === "/checkout" ? "/checkout" : "/biblioteca"
    return NextResponse.redirect(new URL(target, req.url))
  }

  // Protege /livro, /biblioteca e /conta
  if ((path.startsWith("/livro") || path.startsWith("/biblioteca") || path.startsWith("/conta")) && !token) {
    const signIn = new URL("/login", req.url)
    signIn.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(signIn)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login", "/livro/:path*", "/biblioteca/:path*", "/conta"],
}
