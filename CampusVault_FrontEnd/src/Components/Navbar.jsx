import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const closeMenu = () => setOpen(false);

  const linkClasses = ({ isActive }) =>
    isActive ? "text-white font-semibold" : "text-gray-400 hover:text-white";

  const handleLogout = () => {
    // ✅ Step 1: Save all cooldown keys before clearing
    // They look like "lastIdeaPostedAt_42" — we keep these so the
    // timer keeps running even after logout/login
    const cooldownEntries = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key.startsWith("lastIdeaPostedAt_")) {
        cooldownEntries[key] = localStorage.getItem(key);
      }
    }

    // ✅ Step 2: Clear everything (token, profile, id, etc.)
    localStorage.clear();

    // ✅ Step 3: Restore cooldown keys so timer continues after re-login
    Object.entries(cooldownEntries).forEach(([key, value]) => {
      localStorage.setItem(key, value);
    });

    closeMenu();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 w-full bg-[#181818] text-white shadow-lg z-50 pb-6">
      <div className="flex items-center justify-between px-6 py-3">

        {/* Logo */}
        <h1 className="text-2xl font-bold">Campus Vault</h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex flex-1 justify-center space-x-8 text-lg text-gray-400">
          <li><NavLink to="home" end className={linkClasses}>Home</NavLink></li>
          <li><NavLink to="resources" className={linkClasses}>Resources</NavLink></li>
          <li><NavLink to="connect" className={linkClasses}>Connect</NavLink></li>
          <li><NavLink to="about" className={linkClasses}>About</NavLink></li>
          <li><NavLink to="upload" className={linkClasses}>Upload</NavLink></li>
          <li>
             <button
          onClick={handleLogout}
          className="hidden md:flex flex-1 justify-center space-x-8 text-lg text-gray-400"
        >
          Logout
        </button>
          </li>
        </ul>

        {/* Desktop Logout */}
       

        {/* Hamburger */}
        <button
          className="md:hidden text-3xl focus:outline-none"
          onClick={() => setOpen(!open)}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <ul className="md:hidden bg-black text-gray-400 text-center space-y-4 py-4 text-lg">
          <li><NavLink to="home" end className={linkClasses} onClick={closeMenu}>Home</NavLink></li>
          <li><NavLink to="resources" className={linkClasses} onClick={closeMenu}>Resources</NavLink></li>
          <li><NavLink to="connect" className={linkClasses} onClick={closeMenu}>Connect</NavLink></li>
          <li><NavLink to="about" className={linkClasses} onClick={closeMenu}>About</NavLink></li>
          <li><NavLink to="upload" className={linkClasses} onClick={closeMenu}>Upload</NavLink></li>
          <li>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 transition-colors"
            >
              Logout
            </button>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default Navbar;