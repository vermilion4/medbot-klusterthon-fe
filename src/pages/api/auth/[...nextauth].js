import NextAuth from "next-auth";
import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { login } from "@/lib/auth";
import {jwtDecode} from "jwt-decode";

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
        email: {
          label: "Email:",
          type: "text",
        },
        password: {
          label: "Password:",
          type: "password",
        },
      },
      async authorize(credentials) {
        
          const { email, password } = credentials;
          const response = await login({ email, password });

          if (!response.encryptedUser ) {
            return {error: response}
          }

          const user = jwtDecode(response.encryptedUser);
          user.accessToken = response.tokens.access.token;
          return user;
        
      },
    }),
  ],
  callbacks: {
    async jwt(token, user, account, profile, isNewUser) {
      return Promise.resolve(token);
    },
    async session({ session, token, user }) {
      if (token.token.user) {
        session.user = token.token.user; // Add the user to the session object
      }
      return Promise.resolve(session);
    },
  },
  pages: {
    signIn: "/auth/login",
  },
};

export default NextAuth(authOptions);
