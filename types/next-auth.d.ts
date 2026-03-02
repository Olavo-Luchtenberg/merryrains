import "next-auth"

declare module "next-auth" {
  interface User {
    id?: string
    hasPurchase?: boolean
  }

  interface Session {
    user: {
      id?: string
      hasPurchase?: boolean
      email?: string | null
      name?: string | null
      image?: string | null
    }
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string
    hasPurchase?: boolean
  }
}
