import React from "react";
import NavLink from "./NavLink.jsx";

import { auth } from "@/lib/auth.js";
import LogOut from "../Logout.jsx";

const Navbar = async () => {
  const links = [
    {
      title: "home",
      path: "/",
    },
    {
      title: "public",
      path: "/public",
    },
    // {
    //   title: "login",
    //   path: "/login",
    // },
  ];

  const session = await auth();

  return (
    <nav className="flex justify-between p-4 w-full">
      <ul className=" w-4/5 flex items-center gap-5">
        {links.map((link, index) => (
          <NavLink link={link} key={index} />
        ))}
        {!session && <NavLink link={{ title: "login", path: "login" }} />}
        {session && <NavLink link={{ title: "private", path: "private" }} />}
        {session?.user?.isAdmin && (
          <NavLink link={{ title: "Admin", path: "admin" }} />
        )}
      </ul>
      <div className="w-1/5 flex justify-end items-center gap-2">
        <span className="w-[40px] h-[40px] rounded-full ring-1 bg-slate-400 p-3 uppercase font-bold flex justify-center items-center">
          {session ? session.user.username.substring(0, 2) : "?"}
        </span>
        {session && <LogOut />}
      </div>
    </nav>
  );
};

export default Navbar;
