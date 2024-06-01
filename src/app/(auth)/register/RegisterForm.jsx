"use client";
import { register } from "@/lib/user.action.js";
import { useRouter } from "next/navigation.js";
import { useEffect } from "react";
import { useFormState } from "react-dom";
const RegisterForm = () => {
  const [state, formAction] = useFormState(register, undefined);

  const router = useRouter();
  useEffect(() => {
    state?.success && router.push("/login");
  }, [state?.success, router]);

  return (
    <form
      action={formAction}
      className="w-[500px]  flex flex-col items-center gap-5 bg-slate-400 p-5 pt-8 rounded-md text-black"
    >
      <input
        type="text"
        name="username"
        id=""
        placeholder="Nom d'utilisateur"
        className="w-[450px] py-3 px-4 "
      />
      <input
        type="text"
        name="email"
        id=""
        placeholder="Adreese mail"
        className="w-[450px] py-3 px-4 "
      />
      <input
        type="password"
        name="password"
        id=""
        placeholder="Mot de passe"
        className="w-[450px] py-3 px-4"
      />
      <input
        type="password"
        name="cpassword"
        id=""
        placeholder="Confirmer Mot de passe"
        className="w-[450px] py-3 px-4  "
      />
      <button className="w-[450px] py-3 px-4 bg-black text-white">
        S'inscrire
      </button>
      <span className={`${state?.error ? "text-red-600" : "text-green-600"}`}>
        {state?.error}
      </span>
    </form>
  );
};

export default RegisterForm;
