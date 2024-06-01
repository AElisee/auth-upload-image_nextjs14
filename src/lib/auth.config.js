export const authConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        (token.username = user.username), (token.id = user.id);
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.id = token.id;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
    authorized({ auth, request }) {
      const user = auth?.user;

      const isOnAdminPage = request.nextUrl?.pathname.startsWith("/admin");
      const isOnPrivatePage = request.nextUrl?.pathname.startsWith("/private");
      const isOnPublicPage = request.nextUrl?.pathname.startsWith("/public");
      const isOnLoginPage = request.nextUrl?.pathname.startsWith("/login");

      if (isOnAdminPage && !user?.isAdmin) {
        return false;
      }
      if (isOnPrivatePage && !user) {
        return false;
      }

      if (isOnLoginPage && user) {
        return Response.redirect(new URL("/", request.nextUrl));
      }

      return true;
    },
  },
};
