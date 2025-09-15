"use client";

import React, { useState } from "react";

function ReadMore({ children }: { children: string }) {
  const [isReadMoreActive, setIsReadMoreActive] = useState(true);

  const info = isReadMoreActive ? children.slice(0, 100) : children;

  return (
    <>
      {info}{" "}
      <span
        className="text-gray-200 cursor-pointer"
        onClick={() => setIsReadMoreActive((prev) => !prev)}
      >
        {isReadMoreActive ? " ...Read More" : " ...Read Less"}
      </span>
    </>
  );
}

export default ReadMore;
