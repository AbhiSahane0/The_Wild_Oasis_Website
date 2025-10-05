import { submitQuery } from "@/app/_services/actions/actions";
import { guestAlredyExists } from "@/app/_services/apis/guest/apiGuest";
import { auth } from "@/app/_services/auth/auth";
import React from "react";

async function page() {
  const session = await auth();
  const guest = await guestAlredyExists(session?.user.email);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-12 w-full">
      <h2 className="font-semibold text-lg sm:text-xl md:text-2xl lg:text-3xl text-accent-400 mb-4 sm:mb-6">
        Please tell us your query. We promise to solve it at our earliest
        priority.
      </h2>

      <form
        className="bg-primary-900 p-4 sm:p-6 md:p-8 lg:p-12 rounded-lg flex flex-col gap-4 sm:gap-5 md:gap-6"
        action={submitQuery}
      >
        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-sm sm:text-base md:text-lg font-medium">
            Your name
          </label>
          <input
            name="name"
            readOnly
            defaultValue={guest.fullName}
            className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-sm sm:text-base md:text-lg font-medium">
            Email address
          </label>
          <input
            name="email"
            readOnly
            defaultValue={guest.email}
            className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-1.5 sm:space-y-2">
          <label className="block text-sm sm:text-base md:text-lg font-medium">
            Enter your query
          </label>
          <textarea
            name="query"
            placeholder="Please tell us your query here!"
            rows={4}
            className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-5 md:py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm text-sm sm:text-base resize-none focus:outline-none focus:ring-2 focus:ring-accent-500"
          />
        </div>

        <div className="flex justify-end mt-2 sm:mt-4">
          <button className="bg-accent-500 px-6 py-2.5 sm:px-8 sm:py-3 md:py-4 text-primary-800 font-semibold hover:bg-accent-600 transition-all disabled:cursor-not-allowed disabled:bg-gray-500 disabled:text-gray-300 w-full sm:w-auto text-center text-sm sm:text-base rounded-sm shadow-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default page;
