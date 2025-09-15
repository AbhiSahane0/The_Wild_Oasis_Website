import Button from "@/app/_components/Button";
import SelectCountry from "@/app/_components/selectCountry";
import { updateGuest } from "@/app/_services/actions/actions";
import { guestAlredyExists } from "@/app/_services/apis/guest/apiGuest";
import { auth } from "@/app/_services/auth/auth";
import React from "react";

async function page() {
  const session = await auth();

  const guest = await guestAlredyExists(session?.user.email);

  return (
    <div className="p-4">
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your guest profile
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        Providing the following information will make your check-in process
        faster and smoother. See you soon!
      </p>

      <form
        className="bg-primary-900 py-8 px-12 text-lg flex gap-6 flex-col"
        action={updateGuest}
      >
        <div className="space-y-2">
          <label>Full name</label>
          <input
            disabled
            defaultValue={guest.fullName}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <label>Email address</label>
          <input
            disabled
            defaultValue={guest.email}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm disabled:cursor-not-allowed disabled:bg-gray-600 disabled:text-gray-400"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label htmlFor="nationality">Where are you from?</label>
            <img
              src={guest.countryFlag}
              alt="Country flag"
              className="h-5 rounded-sm"
            />
          </div>

          <SelectCountry
            name="nationality"
            id="nationality"
            defaultCountry={guest.nationality}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="nationalID">National ID number</label>
          <input
            name="nationalID"
            defaultValue={guest.nationalID}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <Button />
        </div>
      </form>
    </div>
  );
}

export default page;
