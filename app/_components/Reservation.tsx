import {
  getBookedDatesByCabinId,
  getSettings,
} from "../_services/apis/bookings/apiBookings";
import { auth } from "../_services/auth/auth";
import { Cabin } from "../_types/types";
import DateSelector from "./DatePicker";
import LoginMessage from "./LoginMessage";
import ReservationForm from "./ReservationForm";

async function Reservation({ cabin }: { cabin: Cabin }) {
  const [settings, bookedDates] = await Promise.all([
    getSettings(),
    getBookedDatesByCabinId(cabin.id!),
  ]);
  const session = await auth();

  return (
    <div className="lg:grid lg:grid-cols-[1fr_1fr] gap-2 min-h-[400px] items-center justify-center">
      <DateSelector
        settings={settings}
        bookedDates={bookedDates}
        cabin={cabin}
      />
      {session?.user ? (
        <ReservationForm cabin={cabin} user={session.user} />
      ) : (
        <LoginMessage />
      )}
    </div>
  );
}

export default Reservation;
