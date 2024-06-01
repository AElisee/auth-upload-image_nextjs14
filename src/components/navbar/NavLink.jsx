import Link from "next/link.js";
import React from "react";

const NavLink = ({ link }) => {
  return (
    <li className="uppercase">
      <Link href={link.path}> {link.title}</Link>
    </li>
  );
};

export default NavLink;
