import NextAuth, { NextAuthConfig, type DefaultSession } from "next-auth";
import Credentials from "next-auth/providers/credentials";

declare module "next-auth" {
  interface Session {
    user: {
      address: string;
      token: string;
      roles: string[];
    } & DefaultSession["user"];
  }
}

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/auth/login",
    signOut: "/auth/logout",
    error: "/auth/error",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/login`,
          {
            method: "POST",
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const user = await res.json();
        if (user.error) throw user;
        return user;
      },
    }),
  ],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      let ruta = "";
      console.log("authorized", auth?.user.roles[0]);
      if (auth?.user.roles[0] == "user") {
        const ruta = "/user";
      }
      if (auth?.user.roles[0] == "company") {
        const ruta = "/company";
      }
      const isOnDashboard = nextUrl.pathname.startsWith(ruta);
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL(ruta, nextUrl));
      }
      return true;
    },
    session({ session, token, user }) {
      session.user.roles = token.roles;
      return {
        ...session,
        user: {
          ...session.user,
        },
      };
    },
    jwt({ token, user }) {
      return { ...token, ...user };
    },
  },
};

export const { signIn, signOut, auth, handlers } = NextAuth(authConfig);
