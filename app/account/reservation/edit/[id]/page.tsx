import EditReservationForm from "@/app/_components/EditReservationForm";
import { getBookingById } from "@/app/_services/apis/bookings/apiBookings";
import React from "react";

async function page({ params }) {
  const { id } = await params;

  const data = await getBookingById(id);

  return (
    <div>
      {/* <p className="text-xl text-accent-500 p-2">Edit your reservation</p> */}
      <div>
        <EditReservationForm booking={data} />
      </div>
    </div>
  );
}

export default page;
