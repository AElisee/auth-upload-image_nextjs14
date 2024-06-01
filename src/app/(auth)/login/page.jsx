import { login } from "@/lib/user.action.js";
import React from "react";
import LoginForm from "./LoginForm.jsx";

const LoginPage = () => {
  
  return (
    <div className="w-screen h-screen flex justify-center items-center ">
     <LoginForm/>
    </div>
  );
};

export default LoginPage;
