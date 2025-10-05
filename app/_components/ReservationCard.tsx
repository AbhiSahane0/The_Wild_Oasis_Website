import React from "react";
import { PencilSquareIcon } from "@heroicons/react/24/solid";
import { format, formatDistance, isPast, isToday, parseISO } from "date-fns";
import Image from "next/image";
import DeleteReservation from "./DeleteReservation";
import Link from "next/link";
import { Booking } from "../_types/types";

export const formatDistanceFromNow = (dateStr: string) =>
  formatDistance(parseISO(dateStr), new Date(), {
    addSuffix: true,
  }).replace("about ", "");

async function ReservationCard({ booking }: { booking: Booking }) {
  const {
    id,
    startDate,
    endDate,
    numNights,
    totalPrice,
    numGuests,
    created_at,
    cabins: { cabinId, image },
  } = booking;

  return (
    <div className="flex flex-col sm:flex-row border border-primary-400 rounded-xl overflow-hidden">
      {/* Image */}
      <div className="relative h-48 sm:h-32 sm:aspect-square w-full sm:w-auto">
        <Image
          fill
          src={image}
          alt={`Cabin ${cabinId}`}
          className="object-cover"
        />
      </div>

      {/* Main Content */}
      <div className="flex-grow px-4 sm:px-6 py-3 sm:py-3 flex flex-col">
        <div className="flex items-start sm:items-center justify-between gap-2 mb-2">
          <h3 className="text-base sm:text-lg md:text-xl font-semibold">
            {numNights} nights in Cabin {cabinId}
          </h3>
          {isPast(new Date(startDate)) ? (
            <span className="bg-yellow-800 text-yellow-200 h-6 sm:h-7 px-2 sm:px-3 uppercase text-xs font-bold flex items-center rounded-sm whitespace-nowrap">
              past
            </span>
          ) : (
            <span className="bg-green-800 text-green-200 h-6 sm:h-7 px-2 sm:px-3 uppercase text-xs font-bold flex items-center rounded-sm whitespace-nowrap">
              upcoming
            </span>
          )}
        </div>

        <p className="text-sm sm:text-base md:text-lg text-primary-300 mb-3">
          {format(new Date(startDate), "EEE, MMM dd yyyy")} (
          {isToday(new Date(startDate))
            ? "Today"
            : formatDistanceFromNow(startDate)}
          ) &mdash; {format(new Date(endDate), "EEE, MMM dd yyyy")}
        </p>

        <div className="flex flex-wrap gap-3 sm:gap-5 mt-auto items-baseline">
          <p className="text-lg sm:text-xl font-semibold text-accent-400">
            ${totalPrice}
          </p>
          <p className="text-primary-300 hidden sm:block">&bull;</p>
          <p className="text-base sm:text-lg text-primary-300">
            {numGuests} guest{numGuests > 1 && "s"}
          </p>
          <p className="w-full sm:w-auto sm:ml-auto text-xs sm:text-sm text-primary-400 mt-2 sm:mt-0">
            Booked {format(new Date(created_at), "EEE, MMM dd yyyy, p")}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      {!isPast(new Date(endDate)) && (
        <div className="flex sm:flex-col border-t sm:border-t-0 sm:border-l border-primary-800">
          <Link
            href={`/account/reservation/edit/${id}`}
            className="group flex items-center justify-center gap-2 uppercase text-xs font-bold text-primary-300 border-r sm:border-r-0 sm:border-b border-primary-800 flex-grow px-3 py-3 sm:py-0 hover:bg-accent-600 transition-colors hover:text-primary-900 sm:w-[100px]"
          >
            <PencilSquareIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
            <span className="mt-1">Edit</span>
          </Link>
          <DeleteReservation bookingId={id} />
        </div>
      )}
    </div>
  );
}

export default ReservationCard;
