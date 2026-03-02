import { withAuth } from "next-auth/middleware"

// Protege rotas que exigem login
export default withAuth({
  pages: {
    signIn: "/login",
  },
})

export const config = {
  matcher: ["/livro/:path*", "/biblioteca/:path*"],
}
