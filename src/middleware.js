import { withAuth } from "next-auth/middleware"

export default withAuth({
    // Matches the pages config in `[...nextauth]`
    pages: {
        signIn: "/auth/login",
      },
  })
// Applies next-auth only to matching routes - can be regex
export const config = { matcher: [ "/dashboard/:path*"] }