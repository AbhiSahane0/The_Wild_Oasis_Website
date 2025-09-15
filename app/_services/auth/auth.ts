import NextAuth, { type NextAuthConfig } from "next-auth";
import Google from "next-auth/providers/google";
import { addGuest, guestAlredyExists } from "../apis/guest/apiGuest";

declare module "next-auth" {
  interface Session {
    user: {
      name?: string | null;
      email?: string | null;
      image?: string | null;
      guestId?: string; // 👈 your custom field
    };
  }
}

const authConfig: NextAuthConfig = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),
  ],
  callbacks: {
    authorized({ auth }) {
      return !!auth?.user;
    },
    async signIn({ user }) {
      try {
        const existingGuest = await guestAlredyExists(user.email);

        if (!existingGuest) {
          await addGuest({ fullName: user.name, email: user.email });
        }
        return true;
      } catch (err) {
        console.error("signIn error", err);
        return false;
      }
    },
    async session({ session }) {
      const guest = await guestAlredyExists(session.user.email);

      if (guest) {
        session.user.guestId = guest.id;
      }

      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
};

export const {
  auth,
  signIn,
  signOut,
  handlers: { GET, POST },
} = NextAuth(authConfig);
