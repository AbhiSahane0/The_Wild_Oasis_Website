import EditReservationForm from "@/app/_components/EditReservationForm";
import { getBookingById } from "@/app/_services/apis/bookings/apiBookings";
import React from "react";

interface PageParams {
  id: string;
}

async function page({ params }: { params: PageParams }) {
  const { id } = await params;

  const data = await getBookingById(id);

  console.log(data, "data");

  return (
    <div>
      {/* <p className="text-xl text-accent-500 p-2">Edit your reservation</p> */}
      <div>
        <EditReservationForm
          booking={{
            ...data,
            cabins: Array.isArray(data.cabins) ? data.cabins[0] : data.cabins,
          }}
        />
      </div>
    </div>
  );
}

export default page;
