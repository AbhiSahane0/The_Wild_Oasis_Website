"use server";

import { auth, signIn } from "@/app/_services/auth/auth";
import supabase from "../supabase";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { getBookings } from "../apis/bookings/apiBookings";

export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

export async function updateGuest(formData: FormData) {
  const session = await auth();
  const guestId = session?.user.guestId;
  if (!guestId) throw new Error("No guestId in session");

  const nationalID = formData.get("nationalID")?.toString() ?? null;
  const value = formData.get("nationality")?.toString() ?? "";

  const [nationality, countryFlag] = value.split("%");

  const { error } = await supabase
    .from("guests")
    .update({ nationalID, nationality, countryFlag })
    .eq("id", guestId)
    .select();

  if (error) throw new Error(error.message);

  revalidatePath("/account/profile");

  // return data;
}

export async function deleteBooking(id: string) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  if (!guestBookingIds.includes(id))
    throw new Error("You are not allowed to delete this booking");

  const { error } = await supabase.from("bookings").delete().eq("id", id);
  if (error) throw new Error(error.message);
  revalidatePath("/account/reservation");
}

export async function updateReservation(formData: FormData) {
  const raw = Object.fromEntries(formData);
  const { id, ...rest } = raw;

  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // 2) Authorization
  const guestBookings = await getBookings(session.user.guestId);
  const guestBookingIds = guestBookings.map((booking) => booking.id);

  console.log(guestBookingIds, id);

  if (!guestBookingIds.includes(Number(id)))
    throw new Error("You are not allowed to update this booking");

  const guestId = session?.user.guestId;
  if (!guestId) throw new Error("No guestId in session");

  const updates = {
    startDate: rest.startDate,
    endDate: rest.endDate,
    numGuests: Number(rest.numGuests),
    hasBreakfast: rest.hasBreakfast === "on",
    observations: rest.observations,
  };

  const { error } = await supabase
    .from("bookings")
    .update(updates)
    .eq("id", id);

  if (error) throw new Error(error.message);

  revalidatePath(`/account/reservation/edit/${id}`);
  redirect("/account/reservation");
}

export async function createBooking(bookingData, formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const newBooking = {
    ...bookingData,
    guestId: session.user.guestId,
    numGuests: Number(formData.get("numGuests")),
    observations:
      (formData.get("observations") as string)?.slice(0, 1000) ?? "",
    extrasPrice: 0,
    totalPrice: bookingData.cabinPrice,
    isPaid: false,
    hasBreakfast: false,
    status: "unconfirmed",
  };

  const { error } = await supabase.from("bookings").insert([newBooking]);

  if (error) {
    throw new Error("Booking could not be created");
  }

  revalidatePath(`/cabins/${bookingData.cabinId}`);

  // redirect("/cabins/thankyou");
}
