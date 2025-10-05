type CabinData = {
  cabinId: string | number;
  image: string;
  maxCapacity: number;
};

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
    cabins: CabinData[];
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
  id?: string;
  name?: string;
  regularPrice: number;
  discount: number;
  maxCapacity: number;
  image?: string;
};

export type CreteBooking = {
  startDate: Date | undefined;
  endDate: Date | undefined;
  numNights: number;
  cabinPrice: number;
  cabinId: string | undefined;
};

export type Booking = {
  cabinId?: string;
  id: string;
  startDate: string;
  endDate: string;
  numNights: number;
  totalPrice: number;
  numGuests: number;
  cabinPrice?: number;
  created_at: string;
  cabins: {
    cabinId: string;
    image: string;
  };
};

export type CreateBookingData = {
  startDate: string; // ISO string
  endDate: string;
  numNights: number;
  cabinPrice: number;
  cabinId: string;
  numGuests: number;
  observations?: string;
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
