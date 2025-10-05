import ReservationCard from "@/app/_components/ReservationCard";
import { getBookings } from "@/app/_services/apis/bookings/apiBookings";
import { auth } from "@/app/_services/auth/auth";
import React from "react";

async function page() {
  const session = await auth();

  const data = await getBookings(session?.user?.guestId);

  console.log(data, "data");

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-12 py-4 sm:py-6 max-w-7xl mx-auto">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-accent-500 mb-4 sm:mb-6 font-semibold">
        Your Reservations
      </h1>

      {data.length === 0 ? (
        <div className="text-center py-12 sm:py-16">
          <p className="text-base sm:text-lg text-primary-300 mb-4">
            You don&apos;t have any reservations yet.
          </p>
          <p className="text-sm sm:text-base text-primary-400">
            Book your first cabin to start your adventure!
          </p>
        </div>
      ) : (
        <div className="space-y-4 sm:space-y-6">
          {data.map((booking) => {
            // Ensure cabins is a single object
            const formattedBooking = {
              ...booking,
              cabins: Array.isArray(booking.cabins)
                ? booking.cabins[0]
                : booking.cabins,
            };

            return (
              <ReservationCard
                key={formattedBooking.id}
                booking={formattedBooking}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

export default page;
