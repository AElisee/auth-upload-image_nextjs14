import NextAuth from "next-auth";
import credentialsProvider from "next-auth/providers/credentials";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";
import connectDB from "./connectDb.js";
import { authConfig } from "./auth.config.js";

// cette fonction remplace la fonction de base authjs
const login = async (credentials) => {
  try {
    connectDB();
    const user = await User.findOne({ username: credentials.username });

    if (!user) {
      throw new Error("Mauvais identifiants");
    }

    const isPwdCoorect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPwdCoorect) {
      throw new Error("Mauvais identifiants");
    }

    return user;
  } catch (error) {
    console.log(error);
  }
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    credentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
