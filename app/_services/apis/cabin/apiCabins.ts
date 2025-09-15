import { notFound } from "next/navigation";
import supabase from "../../supabase";

export type Cabins = {
  id: number;
  maxCapacity: number;
  regularPrice: number;
  image: string;
  discount: number;
  cabinId: string;
};

export async function getCabins(): Promise<Cabins[]> {
  const { data: cabins, error } = await supabase
    .from("cabins")
    .select("id,maxCapacity,regularPrice,image,discount,cabinId");

  if (error) throw new Error(error.message);

  return cabins;
}

export type Cabin = {
  id: number;
  maxCapacity: number;
  regularPrice: number;
  image: string;
  description: string;
  discount: number;
  cabinId: string;
};

export async function getCabinById(id: string): Promise<Cabin | null> {
  // console.log(id);
  const { data: cabin, error } = await supabase
    .from("cabins")
    .select("*")
    .eq("id", id)
    .single();

  // console.log(cabin);

  if (error) {
    // throw new Error(error.message);
    console.log(error.message);
    notFound();
  }

  return cabin;
}

export async function getCabinCount() {
  const { count, error } = await supabase
    .from("cabins")
    .select("*", { count: "exact", head: true });

  if (error) throw new Error(error.message);
  console.log(count);

  return count;
}
