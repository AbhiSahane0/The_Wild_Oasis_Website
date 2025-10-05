export type EditReservationFormProps = {
  booking: {
    id: string;
    startDate: string;
    endDate: string;
    numGuests: number;
    cabinPrice: number;
    extrasPrice: number;
    totalPrice: number;
    hasBreakfast: boolean;
    observations: string;
    cabins: {
      cabinId: string | number;
      image: string;
      maxCapacity: number;
    };
  };
};

export type DateSelectorProps = {
  settings: {
    minBookingLength: number;
    maxBookingLength: number;
  };
  cabin: {
    regularPrice: number;
    discount: number;
  };
  bookedDates: Date[];
};

export type Cabin = {
  id: number | string;
  name?: string;
  regularPrice: number;
  discount: number;
  maxCapacity: number;
  image?: string;
};

export type Booking = {
  cabinId?: string;
  id: string;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  created_at: string;
  cabinPrice?: number;
  cabins: {
    cabinId: number | string;
    image: string;
  };
};

type User = {
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
  guestId?: string | undefined;
};

export type ReservationFormProps = {
  cabin: Cabin;
  user: User;
};
