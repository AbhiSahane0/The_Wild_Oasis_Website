import ReservationCard from "@/app/_components/ReservationCard";
import { getBookings } from "@/app/_services/apis/bookings/apiBookings";
import { auth } from "@/app/_services/auth/auth";
import React from "react";

async function page() {
  const session = await auth();

  const data = await getBookings(session?.user?.guestId);

  console.log(data);

  return (
    <div className="px-4">
      <p className="text-xl text-accent-500"> Your Reservations...</p>
      <div className="mt-4 mb-4">
        {data.map((booking) => (
          <ReservationCard key={booking.id} booking={booking} />
        ))}
      </div>
    </div>
  );
}

export default page;
