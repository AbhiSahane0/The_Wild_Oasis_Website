import React from "react";
import CabinCard from "./CabinCard";
import { getCabins } from "../_services/apis/cabin/apiCabins";

async function CardList({ filter }: { filter: string }) {
  const cabins = await getCabins();

  let filterCabins = cabins;

  switch (filter) {
    case "small":
      filterCabins = cabins.filter((item) => item.maxCapacity <= 3);
      break;
    case "medium":
      filterCabins = cabins.filter(
        (item) => item.maxCapacity >= 4 && item.maxCapacity <= 7
      );
      break;
    case "large":
      filterCabins = cabins.filter((item) => item.maxCapacity >= 8);
      break;
    default:
      filterCabins = cabins;
  }

  return (
    <div className="flex flex-wrap gap-6 justify-between">
      {filterCabins.map((cabin) => (
        <CabinCard key={cabin.id} cabin={cabin} />
      ))}
    </div>
  );
}

export default CardList;
