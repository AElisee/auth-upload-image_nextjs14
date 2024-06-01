"use client";
import { login } from "@/lib/user.action.js";
import Link from "next/link.js";
import React from "react";
import { useFormState } from "react-dom";
const LoginForm = () => {
  const [state, formAction] = useFormState(login, undefined);
  return (
    <form
      action={formAction}
      className="w-[500px]  flex flex-col items-center gap-5 bg-slate-400 p-5 pt-8 rounded-md"
    >
      <input
        type="text"
        name="username"
        id=""
        placeholder="Nom d'utilisateur"
        className="w-[450px] py-3 px-4 text-black"
      />
      <input
        type="password"
        name="password"
        id=""
        placeholder="Mot de passe"
        className="w-[450px] py-3 px-4 text-black"
      />
      <button className="w-[450px] py-3 px-4 bg-black">Se connecter</button>
      <Link href="/register">
        <small className="text-black font-semibold">
          Vous n'avez de compte ?
          <span className="underline">Enregistrez-vous !</span>
        </small>
      </Link>
      <small>
        <span>{state?.error}</span>
      </small>
    </form>
  );
};

export default LoginForm;
