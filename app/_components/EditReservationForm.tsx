"use client";

import React from "react";
import { updateReservation } from "../_services/actions/actions";
import { useFormStatus } from "react-dom";
import { EditReservationFormProps } from "../_types/types";
import Image from "next/image";

function EditReservationForm({ booking }: EditReservationFormProps) {
  console.log(booking);
  const {
    id,
    startDate,
    endDate,
    numGuests,
    cabinPrice,
    extrasPrice,
    totalPrice,
    hasBreakfast,
    observations,
    cabins: { cabinId, image, maxCapacity },
  } = booking;

  return (
    <div className="p-4">
      <h2 className="font-semibold text-2xl text-accent-400 mb-4">
        Update your reservation
      </h2>

      <p className="text-lg mb-8 text-primary-200">
        You can update your reservation details below. Please make sure the
        information is correct before saving.
      </p>

      <form
        action={updateReservation}
        className="bg-primary-900 py-8 px-6 md:px-12 text-lg flex flex-col gap-6 rounded-md shadow-lg"
      >
        <input type="hidden" name="id" value={id} />
        {/* Cabin Preview */}
        <div className="space-y-2">
          <label>Cabin</label>

          <div className="flex items-center gap-4">
            <div className="relative h-20 w-28">
              <Image
                src={image}
                alt={`Cabin ${cabinId}`}
                fill
                className="object-cover rounded-sm shadow-md"
                sizes="(max-width: 768px) 100vw, 200px"
                priority
              />
            </div>
            <span className="text-primary-200 font-medium">
              Cabin {cabinId}
            </span>
          </div>
        </div>

        {/* Dates */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label htmlFor="startDate">Start date</label>
            <input
              type="date"
              name="startDate"
              defaultValue={startDate.split("T")[0]}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="endDate">End date</label>
            <input
              type="date"
              name="endDate"
              defaultValue={endDate.split("T")[0]}
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
            />
          </div>
        </div>

        {/* Guests */}
        <div className="space-y-2">
          {/* <label htmlFor="numGuests">Number of guests</label> */}
          <div className="space-y-2">
            <label htmlFor="numGuests">How many guests?</label>
            <select
              name="numGuests"
              id="numGuests"
              className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
              required
              defaultValue={numGuests}
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
          <p className="text-sm text-gray-400">
            Maximum capacity: {maxCapacity} guests
          </p>
        </div>

        <div className="space-y-2">
          <label htmlFor="observations">
            Anything we should know about your stay?
          </label>
          <textarea
            name="observations"
            defaultValue={observations}
            className="px-5 py-3 bg-primary-200 text-primary-800 w-full shadow-sm rounded-sm"
          />
        </div>

        {/* Breakfast Option */}
        <div className="space-y-2">
          <label className="flex items-center gap-3">
            <input
              type="checkbox"
              name="hasBreakfast"
              defaultChecked={hasBreakfast}
              className="h-5 w-5"
            />
            Include breakfast
          </label>
        </div>

        {/* Prices (read-only) */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label>Cabin Price</label>
            <input
              disabled
              defaultValue={cabinPrice}
              className="px-5 py-3 bg-gray-600 text-gray-300 w-full shadow-sm rounded-sm cursor-not-allowed"
            />
          </div>
          <div className="space-y-2">
            <label>Extras Price</label>
            <input
              disabled
              defaultValue={extrasPrice}
              className="px-5 py-3 bg-gray-600 text-gray-300 w-full shadow-sm rounded-sm cursor-not-allowed"
            />
          </div>
          <div className="space-y-2 md:col-span-2">
            <label>Total Price</label>
            <input
              disabled
              defaultValue={totalPrice}
              className="px-5 py-3 bg-gray-600 text-gray-300 w-full shadow-sm rounded-sm cursor-not-allowed"
            />
          </div>
        </div>

        {/* Submit */}
        <Button />
      </form>
    </div>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <div className="flex justify-end items-center gap-6 ">
      <button className="cursor-pointer bg-accent-500 hover:bg-accent-400 p-2">
        {pending ? "Saving..." : "Save changes"}
      </button>
    </div>
  );
}

export default EditReservationForm;
