import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/lib/auth";
import { jwtDecode } from "jwt-decode";
import { setToken } from "@/utils/http";

/**
 * @type {NextAuthOptions}
 */
export const authOptions = {
    secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username:",
          type: "text",
          placeholder: "your-cool-username",
        },
        password: {
          label: "Password:",
          type: "password",
          placeholder: "your-awesome-password",
        },
      },
      async authorize(credentials) {
        try {
          console.log({ credentials });

          const { email, password } = credentials;
          const response = await login({ email, password });
          const user = jwtDecode(response.encryptedUser);
          setToken(response.tokens.access.token);
          return user;
        } catch (error) {
          console.log({ error });
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      if (user) {
        session.user = user; // Add the user to the session object
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
