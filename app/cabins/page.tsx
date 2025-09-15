import React, { Suspense } from "react";
import Loader from "./loading";
import CardList from "./CardList";
import ReadMore from "../_components/ReadMore";
import FilterCabins from "../_components/FilterCabins";
import ReservationReminder from "../_components/ReservationReminder";

async function page({
  searchParams,
}: {
  searchParams: Promise<{ capacity?: string }>;
}) {
  const params = await searchParams;
  const filter = params?.capacity ?? "all";
  return (
    <>
      <div>
        <h1 className="sm:text-4xl text-3xl text-accent-400 font-medium mb-5">
          Our Luxury Cabins
        </h1>

        <p className="text-primary-200 text-lg mb-10 ">
          <ReadMore>
            Cozy yet luxurious cabins, located right in the heart of the Italian
            Dolomites. Imagine waking up to beautiful mountain views, spending
            your days exploring the dark forests around, or just relaxing in
            your private hot tub under the stars. Enjoy nature&apos;s beauty in
            your own little home away from home. The perfect spot for a
            peaceful, calm vacation. Welcome to paradise.
          </ReadMore>
        </p>
      </div>

      <div className="flex justify-end mb-6">
        <FilterCabins />
      </div>

      <Suspense fallback={<Loader />} key={filter}>
        <CardList filter={filter} />
        <ReservationReminder />
      </Suspense>
    </>
  );
}

export default page;
