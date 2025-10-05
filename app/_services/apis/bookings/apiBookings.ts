import { eachDayOfInterval } from "date-fns";
import supabase from "../../supabase";

export async function getBookings(id: string | undefined) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "created_at,id,startDate,endDate,numNights,numGuests,cabinPrice,extrasPrice,totalPrice,hasBreakfast,cabins(image,cabinId)"
    )
    .eq("guestId", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function getBookingById(id: string | null) {
  const { data, error } = await supabase
    .from("bookings")
    .select(
      "created_at,id,startDate,endDate,numNights,numGuests,cabinPrice,extrasPrice,totalPrice,hasBreakfast,observations,cabins(image,cabinId,maxCapacity)"
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);

  return data;
}

export async function getBookedDatesByCabinId(cabinId: string) {
  const todayDate = new Date();
  todayDate.setUTCHours(0, 0, 0, 0);
  const today: string = todayDate.toISOString();

  // Getting all bookings
  const { data, error } = await supabase
    .from("bookings")
    .select("*")
    .eq("cabinId", cabinId)
    .or(`startDate.gte.${today},status.eq.checked-in`);

  if (error) {
    console.error(error);
    throw new Error("Bookings could not get loaded");
  }

  // Converting to actual dates to be displayed in the date picker
  const bookedDates = data
    .map((booking) => {
      return eachDayOfInterval({
        start: new Date(booking.startDate),
        end: new Date(booking.endDate),
      });
    })
    .flat();

  return bookedDates;
}

export async function getSettings() {
  const { data, error } = await supabase.from("settings").select("*").single();

  // await new Promise((res) => setTimeout(res, 5000));

  if (error) {
    console.error(error);
    throw new Error("Settings could not be loaded");
  }

  return data;
}
