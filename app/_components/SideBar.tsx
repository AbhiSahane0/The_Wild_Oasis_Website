"use client";

import React, { useReducer } from "react";
import {
  Book,
  CircleUserRound,
  LogOut,
  MessageCircleQuestion,
  UserLock,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";

type State = { isOpen: boolean; activeTab: string };
const initialState: State = { activeTab: "account", isOpen: false };

type Action =
  | { type: "SET_TAB"; tab: string }
  | { type: "TOGGLE_MENU" }
  | { type: "CLOSE_MENU" };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "SET_TAB":
      return { ...state, activeTab: action.tab };
    case "CLOSE_MENU":
      return { ...state, isOpen: false };
    case "TOGGLE_MENU":
      return { ...state, isOpen: !state.isOpen };
    default:
      return state;
  }
}

const SidebarItems = [
  { lable: "Account", icon: <UserLock />, link: "/account" },
  { lable: "Profile", icon: <CircleUserRound />, link: "/account/profile" },
  { lable: "Reservations", icon: <Book />, link: "/account/reservation" },
  {
    lable: "Support",
    icon: <MessageCircleQuestion />,
    link: "/account/support",
  },
  { lable: "Signout", icon: <LogOut />, link: "" },
];

function SideBar() {
  const [, dispatch] = useReducer(reducer, initialState);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="border-r border-primary-900 lg:flex flex-col hidden">
        <h1 className="text-xl text-accent-500 ">Navigate</h1>
        <div className="mt-10 flex flex-col gap-8 text-lg">
          <ul className="flex flex-col gap-12">
            {SidebarItems.map(({ lable, icon, link }) => (
              <li key={lable}>
                {lable === "Signout" ? (
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="flex items-center gap-2 hover:cursor-pointer hover:text-accent-500"
                  >
                    {icon}
                    <span>{lable}</span>
                  </button>
                ) : (
                  <Link
                    href={link}
                    className={`${
                      pathname === link ? "text-accent-500" : ""
                    } flex items-center gap-2 hover:cursor-pointer hover:text-accent-500`}
                    onClick={() => dispatch({ type: "SET_TAB", tab: link })}
                  >
                    {icon}
                    <span>{lable}</span>
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mobile Sidebar Toggle (Bottom-Right) */}
    </>
  );
}

export default SideBar;
