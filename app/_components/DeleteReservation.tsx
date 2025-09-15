"use client";

import { TrashIcon } from "@heroicons/react/24/solid";
import { deleteBooking } from "../_services/actions/actions";
import { useFormStatus } from "react-dom";

function DeleteReservation({ bookingId }: { bookingId: string }) {
  return (
    <form
      className="group flex items-center gap-2 uppercase text-xs font-bold text-primary-300 flex-grow  hover:bg-accent-600 transition-colors hover:text-primary-900 cursor-pointer rounded-xl"
      action={() => deleteBooking(bookingId)}
    >
      <Button />
    </form>
  );
}

function Button() {
  const { pending } = useFormStatus();

  return (
    <button className="flex items-center justify-center cursor-pointer p-3">
      <TrashIcon className="h-5 w-5 text-primary-600 group-hover:text-primary-800 transition-colors" />
      <span className="mt-1">{pending ? "Deleting..." : "Delete"}</span>
    </button>
  );
}

export default DeleteReservation;
