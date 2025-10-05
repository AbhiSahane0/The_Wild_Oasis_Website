import ReadMore from "@/app/_components/ReadMore";
import Reservation from "@/app/_components/Reservation";
import Spinner from "@/app/_components/Spinner";

import { getCabinById, getCabins } from "@/app/_services/apis/cabin/apiCabins";
import { Tag, Users } from "lucide-react";
import Image from "next/image";
import React, { Suspense } from "react";

type Cabin = {
  maxCapacity: number;
  regularPrice: number;
  image: string;
  discount: number;
  description: string;
  cabinId: string;
};

export async function generateStaticParams() {
  const cabins = await getCabins();
  const ids = cabins.map((cabin) => ({ cabinId: String(cabin.id) }));
  return ids;
}

async function page({ params }: { params: { cabinId: string } }) {
  const { cabinId } = await params;

  const cabin: Cabin | null = await getCabinById(cabinId);

  if (!cabin) {
    return <div>Cabin not found</div>;
  }

  const {
    maxCapacity,
    regularPrice,
    image,
    discount,
    description,
    cabinId: id,
  } = cabin;

  const finalPrice =
    discount > 0
      ? Math.round((regularPrice * (100 - discount)) / 100)
      : regularPrice;

  return (
    <>
      <div className="flex flex-col md:flex-row overflow-hidden">
        <div className="relative w-full md:w-1/2 md:h-80 h-48">
          <Image src={image} fill className="object-cover" alt="cabin-img" />
        </div>
        <h1 className="text-2xl md:text-3xl font-semibold bg-gray-900 absolute p-2">
          Cabin {id}
        </h1>
        <div className="w-full md:w-1/2 mt-4 sm:mt-0 md:p-8 flex flex-col justify-center space-y-6">
          <p className="text-gray-400 text-[15px] sm:text-[17px] leading-relaxed">
            <ReadMore>{description ?? ""}</ReadMore>
          </p>

          <div className="md:flex md:justify-between space-y-2">
            <div className="flex items-center gap-3 text-gray-400 sm:text-[17px]">
              <Users size={18} />
              <span>
                Perfect for <strong>{maxCapacity}</strong> guests
              </span>
            </div>

            <div className="flex">
              {discount > 0 ? (
                <div className="flex items-center gap-3">
                  <span className="text-gray-400 line-through">
                    ${regularPrice}
                  </span>
                  <span className="text-xl font-semibold text-gray-400">
                    ${finalPrice} per night
                  </span>
                  <span className="text-sm text-green-600 px-2 py-1 rounded flex gap-1">
                    <Tag size={18} />
                    {discount}% off
                  </span>
                </div>
              ) : (
                <div className="text-xl font-semibold text-gray-400">
                  ${regularPrice} per night
                </div>
              )}
            </div>
          </div>

          {/* Reserve Button */}
          <button className="bg-accent-500 hover:bg-accent-600 text-white font-bold text-lg px-6 py-3 rounded transition-colors w-full md:w-auto hover:cursor-pointer">
            Reserve Now By Filling Below Form
          </button>

          {/* Privacy */}
          <p className="text-sm text-gray-400 pt-2 border-t border-gray-100">
            We care about your privacy
          </p>
        </div>
      </div>

      <div>
        <h2 className="text-5xl font-semibold text-center mb-10 text-accent-400 mt-4">
          Reserve today. Pay on arrival.
        </h2>

        <Suspense fallback={<Spinner />}>
          <Reservation cabin={cabin} />
        </Suspense>
      </div>
    </>
  );
}

export default page;
