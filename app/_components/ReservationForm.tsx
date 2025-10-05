"use client";

import { differenceInDays } from "date-fns";
import { useReservationContext } from "../_context/ReservationContext";
import { createBooking } from "../_services/actions/actions";
import { useFormStatus } from "react-dom";
import Image from "next/image";
import { ReservationFormProps } from "../_types/types";

function ReservationForm({ cabin, user }: ReservationFormProps) {
  const { range, resetRange } = useReservationContext();
  const { maxCapacity, regularPrice, discount, id } = cabin;

  const startDate = range?.from;
  const endDate = range?.to;

  // only compute if both dates exist
  const numNights =
    startDate && endDate ? differenceInDays(endDate, startDate) : 0;

  const cabinPrice = numNights ? numNights * (regularPrice - discount) : 0;

  const bookingData = {
    startDate,
    endDate,
    numNights,
    cabinPrice,
    cabinId: id,
  };

  const createBookingWithData = createBooking.bind(null, bookingData);

  return (
    <div className="scale-[1.01] mt-8">
      <div className="bg-primary-800 text-primary-300 px-16 py-2 flex justify-between items-center">
        <p>Logged in as</p>

        <div className="flex gap-4 items-center">
          <Image
            referrerPolicy="no-referrer"
            className="h-8 w-8 rounded-full"
            src={user.image || ""}
            alt={user.name || "img"}
            width={32}
            height={32}
          />
          <p>{user.name}</p>
        </div>
      </div>

      <form
        action={async (formData) => {
          console.log("calling create booking");
          await createBookingWithData(formData);
          console.log("reset range going to call");
          resetRange();
          window.location.href = "/cabins/thankyou";
        }}
        className="bg-primary-900 py-10 px-16 text-lg flex gap-5 flex-col"
      >
        {/* Hidden inputs with safe defaults */}
        <input
          type="hidden"
          name="startDate"
          value={startDate ? startDate.toISOString() : ""}
        />
        <input
          type="hidden"
          name="endDate"
          value={endDate ? endDate.toISOString() : ""}
        />
        <input
          type="hidden"
          name="numNights"
          value={Number.isFinite(numNights) ? numNights : ""}
        />
        <input
          type="hidden"
          name="cabinPrice"
          value={Number.isFinite(cabinPrice) ? cabinPrice : ""}
        />
        <input type="hidden" name="cabinId" value={id} />

        <div className="space-y-2">
          <label htmlFor="numGuests">How many guests?</label>
          <select
            name="numGuests"
            id="numGuests"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            required
          >
            <option value="" key="">
              Select number of guests...
            </option>
            {Array.from({ length: maxCapacity }, (_, i) => i + 1).map((x) => (
              <option value={x} key={x}>
                {x} {x === 1 ? "guest" : "guests"}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            id="observations"
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            placeholder="Any pets, allergies, special requirements, etc.?"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          {!(startDate && endDate) ? (
            <p className="text-primary-300 text-base">
              Start by selecting dates
            </p>
          ) : (
            <Buttton />
          )}
        </div>
      </form>
    </div>
  );
}

function Buttton() {
  const { pending } = useFormStatus();

  return (
    <button className="bg-accent-500 p-2 cursor-pointer">
      {pending ? "Reserving" : "Reserve now"}
    </button>
  );
}

export default ReservationForm;
