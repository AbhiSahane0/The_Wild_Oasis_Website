import SideBar from "../_components/SideBar";
import React from "react";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="grid grid-cols-[200px_1fr] h-screen">
      <SideBar />

      <main>{children}</main>
    </div>
  );
}

export default layout;
