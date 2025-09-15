import React from "react";
import { signInAction } from "../_services/actions/actions";
import Image from "next/image";

function page() {
  return (
    <form action={signInAction}>
      <div className=" flex flex-col items-center justify-center gap-6">
        <p className="text-2xl text-accent-500">
          Please sign in to proceed next
        </p>
        <button className="flex items-center gap-3 rounded-xl border border-gray-300 bg-white px-5 py-2 shadow-md transition hover:bg-gray-50 active:scale-95 cursor-pointer">
          <div className="relative h-6 w-6">
            <Image
              src="https://img.icons8.com/?size=100&id=V5cGWnc9R4xj&format=png&color=000000"
              alt="Google logo"
              fill
              className="object-contain"
            />
          </div>
          <span className="text-sm font-medium text-gray-700">
            Continue with Google
          </span>
        </button>
      </div>
    </form>
  );
}

export default page;
