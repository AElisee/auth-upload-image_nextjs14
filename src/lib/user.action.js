"use server";

import { signIn, signOut } from "./auth.js";
import connectDB from "./connectDb.js";
import { User } from "./user.model.js";
import bcrypt from "bcrypt";

export const handleLogout = async () => {
  await signOut();
};

export const register = async (previousState, formData) => {
  const { username, email, password, cpassword } = Object.fromEntries(formData);

  if ((!username, !email, !password, !cpassword)) {
    return { error: "Tous les champs sont obligatoire" };
  }

  if (password !== cpassword) {
    return { error: "Les mots de passe ne correspondent pas !" };
  }

  try {
    connectDB();

    const user = await User.findOne({ username });
    if (user) {
      return { error: "Cet utilisateur existe déjà !" };
    }
    // bcrypt
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    //---

    const newUser = await new User({
      username,
      email,
      password: hashedPassword,
    });
    await newUser.save();
    console.log("nouvel utilisateur ajouté");
    return { success: true };
  } catch (error) {
    console.log(error);
    return { error: "L'inscription n'a pas réussi !" };
  }
};

export const login = async (previousState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (error) {
    if (error.name == "CredentialsSignin") {
      return { error: "Nom d'utilisateur ou mot de passe invalide !" };
    }
    throw error;
  }
};
