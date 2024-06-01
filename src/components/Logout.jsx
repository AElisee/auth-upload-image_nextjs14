import { handleLogout } from "@/lib/user.action.js";
import React from "react";

const LogOut = () => {
  return (
    <form action={handleLogout}>
      <button>Quitter</button>
    </form>
  );
};

export default LogOut;
