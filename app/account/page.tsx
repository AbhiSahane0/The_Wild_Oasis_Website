import React from "react";
import { auth } from "../_services/auth/auth";
// import ReservationCard from "../_components/ReservationCard";
// import { getBookings } from "../_services/apis/bookings/apiBookings";

async function page() {
  const session = await auth();

  const firstName = session?.user?.name?.split(" ").at(0);

  // const data = await getBookings(session?.user?.guestId);

  return (
    <div className="px-4">
      <p className="text-xl text-accent-500"> Welcome, {firstName}</p>
      {/* <div className="mt-4 mb-4">
        {data.map((booking) => (
          <ReservationCard key={booking.id} booking={booking} />
        ))}
      </div> */}
    </div>
  );
}

export default page;
