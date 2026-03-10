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

  // Se logado, vai direto para a biblioteca (home ou login)
  if (token && (path === "/" || path === "/login")) {
    return NextResponse.redirect(new URL("/biblioteca", req.url))
  }

  // Protege /livro e /biblioteca
  if ((path.startsWith("/livro") || path.startsWith("/biblioteca")) && !token) {
    const signIn = new URL("/login", req.url)
    signIn.searchParams.set("callbackUrl", path)
    return NextResponse.redirect(signIn)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/", "/login", "/livro/:path*", "/biblioteca/:path*"],
}
