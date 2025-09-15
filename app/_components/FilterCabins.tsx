"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";

function FilterCabins() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();

  const currentFilter = searchParams.get("capacity") ?? "all"; // default "all"

  function handleFilterClick(filter: string) {
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);

    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  const buttonData = [
    {
      children: "All Cabins",
      filter: "all",
    },
    {
      children: "1 – 3 guest",
      filter: "small",
    },
    {
      children: "4 – 7 guest",
      filter: "medium",
    },
    {
      children: "8 – 12 guest",
      filter: "large",
    },
  ];

  return (
    <div className="flex">
      {buttonData.map((item) => (
        <Button
          handleFilterClick={handleFilterClick}
          filter={item.filter}
          key={item.filter}
          isActive={currentFilter === item.filter}
        >
          {item.children}
        </Button>
      ))}
    </div>
  );
}

function Button({
  children,
  filter,
  handleFilterClick,
  isActive,
}: {
  children: string;
  filter: string;
  handleFilterClick: (filter: string) => void;
  isActive: boolean;
}) {
  return (
    <button
      className={`text-primary-400 px-4 py-2 border border-primary-700 cursor-pointer hover:bg-primary-800 ${
        isActive ? `bg-primary-800` : ""
      }`}
      onClick={() => handleFilterClick(filter)}
    >
      {children}
    </button>
  );
}

export default FilterCabins;
