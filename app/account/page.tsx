import React from "react";
import { auth } from "../_services/auth/auth";
import Link from "next/link";

async function page() {
  const session = await auth();

  const firstName = session?.user?.name?.split(" ").at(0);

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-6 max-w-5xl mx-auto">
      <p className="text-lg sm:text-xl md:text-2xl text-accent-500 mb-6 sm:mb-8">
        Welcome, {firstName}
      </p>

      <p className="text-base sm:text-lg md:text-xl leading-relaxed mb-8 sm:mb-10 md:mb-12 text-primary-200">
        At{" "}
        <span className="font-bold text-lg sm:text-xl md:text-2xl text-accent-500">
          The Wild Oasis
        </span>{" "}
        we provide best-in-class services with{" "}
        <span className="font-bold text-lg sm:text-xl md:text-2xl text-accent-500">
          personalized luxury cabins
        </span>{" "}
        designed for your ultimate comfort. Most importantly,{" "}
        <span className="font-bold text-lg sm:text-xl md:text-2xl text-accent-500">
          we care deeply about your privacy
        </span>{" "}
        and ensure complete discretion throughout your stay. Your satisfaction
        is our top priority. Our dedicated{" "}
        <span className="font-bold text-lg sm:text-xl md:text-2xl text-accent-500">
          staff is available 24/7
        </span>{" "}
        to cater to your every need, ensuring a seamless and unforgettable
        experience. From the moment you arrive until your departure, we are
        committed to exceeding your expectations with warm hospitality,
        attention to detail, and a genuine passion for making your stay
        extraordinary.
      </p>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 md:gap-8 justify-center items-stretch sm:items-center">
        <Link href={"/account/profile"} className="w-full sm:w-auto">
          <button className="w-full bg-accent-500 px-6 py-3 sm:px-8 sm:py-4 text-white text-sm sm:text-base font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer rounded-sm shadow-md">
            Update profile
          </button>
        </Link>
        <Link href={"/account/reservation"} className="w-full sm:w-auto">
          <button className="w-full bg-accent-500 px-6 py-3 sm:px-8 sm:py-4 text-white text-sm sm:text-base font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 cursor-pointer rounded-sm shadow-md">
            Head to Reservations
          </button>
        </Link>
      </div>
    </div>
  );
}

export default page;
