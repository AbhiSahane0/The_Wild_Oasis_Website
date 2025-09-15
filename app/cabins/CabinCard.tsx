import {
  CircleDollarSign,
  MoveRight,
  TicketPercent,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Cabin = {
  id: number;
  maxCapacity: number;
  regularPrice: number;
  image: string;
  discount: number;
  cabinId: string;
};

function CabinCard({
  cabin: { id, maxCapacity, regularPrice, image, discount, cabinId },
}: {
  cabin: Cabin;
}) {
  return (
    <div className="flex flex-col rounded-2xl overflow-hidden shadow-lg bg-primary-900 border border-primary-700 hover:shadow-xl transition-shadow w-full sm:w-[48%]">
      {/* Image */}
      <div className="relative h-48 w-full">
        <Image
          src={image}
          fill
          className="object-cover"
          alt={`Cabin ${cabinId}`}
        />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3">
        <h2 className="text-xl font-semibold text-accent-400">
          Cabin {cabinId}
        </h2>

        <div className="flex sm:justify-between text-primary-200 text-sm flex-col sm:flex-row gap-2 justify-start">
          <p className="flex items-center sm:justify-center gap-2 sm:text-lg">
            {" "}
            <Users />
            Capacity for up to {maxCapacity} guests
          </p>
          <p className="flex items-center sm:justify-center gap-2 text-lg">
            <CircleDollarSign className="" />
            {discount && discount > 0 ? (
              <span className="flex items-center gap-2">
                {/* Original Price */}
                <span className="text-primary-300 line-through">
                  ${regularPrice}
                </span>
                {/* Discounted Price */}
                <span className="font-semibold text-green-400">
                  ${regularPrice - (regularPrice * discount) / 100} / Night
                </span>
              </span>
            ) : (
              <span className="font-medium text-primary-50">
                ${regularPrice} / Night
              </span>
            )}
          </p>
        </div>

        <p className="text-sm text-primary-300 ">
          {discount && discount > 0 ? (
            <>
              {" "}
              <span className="text-green-400 font-semibold flex items-center gap-2 text-xl">
                <TicketPercent /> Discount: {discount}%
              </span>
            </>
          ) : (
            "No current discounts"
          )}
        </p>

        {/* Button */}
        <Link
          href={`${`/cabins/${id}`}`}
          className="mt-4 bg-accent-500 text-primary-900 px-4 py-2 rounded-lg font-medium hover:bg-accent-600 transition flex items-center justify-center p-2 cursor-pointer gap-2"
        >
          {"See more & Reserve "} <MoveRight />
        </Link>
      </div>
    </div>
  );
}

export default CabinCard;
