import React, { useState } from "react";
import { HoveredLink, Menu } from "./ui/NavbarUI.jsx";
import { cn } from "../utils/cn.js";
import { useDispatch, useSelector } from "react-redux";
import { setToken, signOut } from "../Redux/features/AuthSlice.js";

export function NavbarDemo() {
  return (
    <div className="relative w-full flex items-center justify-center">
      <Navbar className="top-2" />
    </div>
  );
}

function Navbar({ className }) {
  const [active, setActive] = useState(null);
  const { user } = useSelector((state) => state.auth);
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div
      className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
    >
      <Menu setActive={setActive}>
        <HoveredLink setActive={setActive} to="/">
          Home
        </HoveredLink>
        <HoveredLink setActive={setActive} to="/wishlist">
          Wishlist
        </HoveredLink>
        {(user || token) && (
          <HoveredLink setActive={setActive} to="/addBooks">
            Add Books
          </HoveredLink>
        )}
        {(user || token) && (
          <HoveredLink setActive={setActive} to="/addBooks">
            Edit Books
          </HoveredLink>
        )}
        {/* <HoveredLink setActive={setActive} href="/web-dev">
          Edit Books
        </HoveredLink> */}
        {!(user || token) ? (
          <HoveredLink setActive={setActive} to="/auth">
            Sign In
          </HoveredLink>
        ) : (
          <HoveredLink
            setActive={setActive}
            to="/auth"
            onClick={() => {
              dispatch(signOut());
              dispatch(setToken(null));
              localStorage.removeItem("token");
              localStorage.removeItem("user");
            }}
          >
            Sign Out
          </HoveredLink>
        )}
      </Menu>
    </div>
  );
}
