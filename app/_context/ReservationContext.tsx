"use client";

import { createContext, useContext, useState } from "react";
import { DateRange } from "react-day-picker";

type ReservationContextType = {
  range: DateRange | undefined;
  setRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
  resetRange: () => void;
};

// ✅ proper initial state matching the type
const initialContextValue: ReservationContextType = {
  range: undefined,
  setRange: () => {
    throw new Error("setRange called outside of ReservationProvider");
  },
  resetRange: () => {
    throw new Error("resetRange called outside of ReservationProvider");
  },
};

export const ReservationContext =
  createContext<ReservationContextType>(initialContextValue);

export default function ReservationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [range, setRange] = useState<DateRange | undefined>(undefined);

  function resetRange() {
    setRange(undefined);
    console.log(range);
  }

  return (
    <ReservationContext.Provider value={{ range, setRange, resetRange }}>
      {children}
    </ReservationContext.Provider>
  );
}

export function useReservationContext() {
  return useContext(ReservationContext);
}
