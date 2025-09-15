"use client";

// Next.js imports
import Image from "next/image";
import Link from "next/link";

import React, { useReducer } from "react";
import { usePathname } from "next/navigation";

//icons
import {
  Book,
  CircleUserRound,
  House,
  Info,
  LogOut,
  Menu,
  MessageCircleQuestion,
  UserLock,
  Warehouse,
  X,
} from "lucide-react";

// Motion
import { motion, AnimatePresence } from "framer-motion";

// Logo
import Logo from "@/public/logo.png";

// --- Reducer ---
type State = { isOpen: boolean; activeTab: string };
type Action =
  | { type: "TOGGLE_MENU" }
  | { type: "CLOSE_MENU" }
  | { type: "SET_TAB"; tab: string };

const initialState: State = { isOpen: false, activeTab: "home" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "TOGGLE_MENU":
      return { ...state, isOpen: !state.isOpen };
    case "CLOSE_MENU":
      return { ...state, isOpen: false };
    case "SET_TAB":
      return { ...state, activeTab: action.tab };
    default:
      return state;
  }
}

// --- Nav Items ---
const webNavItems = [
  { label: "Home", href: "/" },
  { label: "Cabins", href: "/cabins" },
  { label: "About", href: "/about" },
  {
    label: "Guest Area",
    href: "/account",
  },
];

//Mobile view tabs
const mobileNavItems = [
  { label: "Home", href: "/", icon: <House size={18} /> },
  { label: "Cabins", href: "/cabins", icon: <Warehouse size={18} /> },
  { label: "About", href: "/about", icon: <Info size={18} /> },

  { label: "Account", href: "/account", icon: <UserLock size={18} /> },
  {
    label: "Profile",
    href: "/account/profile",
    icon: <CircleUserRound size={18} />,
  },
  {
    label: "Reservations",
    href: "/account/reservation",
    icon: <Book size={18} />,
  },
  {
    label: "Support",
    href: "/account/support",
    icon: <MessageCircleQuestion size={18} />,
  },
  { label: "Signout", href: "/account/signout", icon: <LogOut size={18} /> },
];

type User = {
  image: string;
};

function Navbar({ image }: User) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const pathname = usePathname();

  return (
    <div
      className={`relative z-50 px-4 py-6 max-w-7xl mx-auto ${
        pathname !== "/" && "border-b border-gray-800"
      }`}
    >
      <div className="flex items-center justify-between">
        {/* Logo + Heading */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image src={Logo} alt="logo" width={60} height={60} />
          </Link>
          <h1 className="sm:text-2xl font-bold text-gray-300">
            The Wild Oasis
          </h1>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden gap-8 text-xl text-gray-400 sm:flex">
          {webNavItems.map(({ label, href }) => {
            const isActive = pathname === href;

            return (
              <li
                key={href}
                className={
                  isActive ? "text-accent-600" : "hover:text-accent-600"
                }
              >
                <Link href={href} className="flex items-center gap-2">
                  {label === "Guest Area" && image && (
                    <span className="relative w-8 h-8 overflow-hidden rounded-full">
                      <Image
                        src={image}
                        alt="User avatar"
                        fill
                        className="object-cover"
                      />
                    </span>
                  )}
                  <span>{label}</span>
                </Link>
              </li>
            );
          })}
        </ul>

        {/* Mobile Menu Button */}
        <button
          className="sm:hidden z-50"
          onClick={() => dispatch({ type: "TOGGLE_MENU" })}
          aria-label="Toggle menu"
        >
          {state.isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Animated Mobile Menu */}
      <AnimatePresence>
        {state.isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black/50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => dispatch({ type: "CLOSE_MENU" })}
            />

            {/* Sidebar */}
            <motion.aside
              className="fixed top-0 right-0 h-full w-64 bg-primary-800 border-l border-primary-900 shadow-2xl z-50 p-6 flex flex-col"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <ul className="flex flex-col space-y-6 text-lg text-primary-100">
                {mobileNavItems.map(({ label, href, icon }) => {
                  const isActive = pathname === href;
                  return (
                    <li
                      key={label}
                      className={`flex items-center gap-3 ${
                        isActive ? "text-accent-600" : ""
                      }`}
                    >
                      <Link
                        href={href}
                        onClick={() => dispatch({ type: "CLOSE_MENU" })}
                        className="flex items-center gap-3 hover:text-accent-500"
                      >
                        {icon}
                        {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Navbar;
