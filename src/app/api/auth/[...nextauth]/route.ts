import NextAuth, { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text", placeholder: "johnsmith" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("credentials", credentials);

        if (credentials) {
          const res = await fetch("https://dummyjson.com/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              username: credentials?.username?.trim(),
              password: credentials?.password?.trim(),
              expiresInMins: 60,
            }),
          }).then((res) => res.json());

          console.log("res", res);

          if (res?.message) {
            throw new Error("Username or password incorrectly");
          }

          if (res) {
            return res;
          } else {
            return null;
          }
        } else {
          return null;
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      profile: (profile, tokens) => {
        if (profile) {
          return {
            id: profile.sub,
            name: profile.firstName,
            lastName: profile.family_name,
            firstName: profile.given_name,
            image: profile.picture,
          };
        } else {
          throw new Error("Login Failed");
        }
      },
    }),
  ],
  callbacks: {
    async session({ session, token, user }) {
      const sessionInfo = {
        user: {
          id: token.id,
          username: token.username,
          email: token.email,
          name: `${token.firstName} ${token.lastName}`,
          image: token.image,
        },
        expires: session.expires,
        accessToken: token.token,
      };

      return sessionInfo as Session;
    },
    async jwt({ token, user, account, profile }) {
      return { ...token, ...user };
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
