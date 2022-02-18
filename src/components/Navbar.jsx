import React from "react";
import { user } from "./Data";
const Navbar = () => {
  return (
    <div className="flex justify-between items-center bg-zinc-900 text-white h-14 px-10 ">
      <h1 className="font-bold text-xl">Edvora</h1>
      <div className="flex flex-row justify-between items-center">
        <h2 className="mr-2">{user.name}</h2>
        <img
          className="w-11 h-11 rounded-full"
          src={user.profile_img}
          alt="img"
        />
      </div>
    </div>
  );
};

export default Navbar;
