import supabase from "../../supabase";

// type newUser = {
//   name: string | null | undefined;
//   email: string | null | undefined;
// };

export async function guestAlredyExists(email: string | null | undefined) {
  if (!email) return null;

  const { data, error } = await supabase
    .from("guests")
    .select("*")
    .eq("email", email)
    .maybeSingle(); // ✅ returns single row or null

  if (error) throw new Error(error.message);

  return data; // guest object or null
}

export async function addGuest(newUser: {
  fullName?: string | null;
  email?: string | null;
}) {
  const { data, error } = await supabase
    .from("guests")
    .insert([newUser])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
