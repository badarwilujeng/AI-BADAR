import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "@/lib/prisma"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: "jwt",
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
      CredentialsProvider({
        name: "Credentials",
        credentials: {
          studentId: { label: "NIM", type: "text", placeholder: "Masukkan NIM" },
          password: { label: "Password", type: "password" }
        },
        async authorize(credentials) {
          console.log('Authorize called with credentials:', { 
            studentId: credentials?.studentId,
            hasPassword: !!credentials?.password 
          });

          if (!credentials?.studentId || !credentials?.password) {
            console.log('Missing credentials');
            return null;
          }

          try {
            const user = await prisma.user.findUnique({
              where: { studentId: credentials.studentId as string }
            });

            console.log('User found in DB:', user ? { id: user.id, studentId: user.studentId } : 'null');

            if (!user || !user.password) {
              console.log('User not found or has no password');
              return null;
            }

            const isPasswordValid = await bcrypt.compare(
              credentials.password as string,
              user.password
            );

            console.log('Is password valid:', isPasswordValid);

            if (!isPasswordValid) {
              return null;
            }

            return user;
          } catch (error) {
            console.error('Authorize error:', error);
            return null;
          }
        }
      })
  ],
  callbacks: {
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
      }
      return token;
    }
  },
  pages: {
    signIn: '/login', // Custom login page
  }
})
