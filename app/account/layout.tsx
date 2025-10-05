import SideBar from "../_components/SideBar";
import React from "react";

function layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="flex flex-col lg:grid lg:grid-cols-[200px_1fr] min-h-screen">
      <SideBar />

      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  );
}

export default layout;
