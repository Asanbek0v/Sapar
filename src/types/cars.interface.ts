export type Car = {
  id: number;
  images: string;
  model: string;
  brand: string;
  capacity: number;
  drive: string;
  places: number;
  days: string;
  year: number;
  price: number;
  transmission: string;
  fuelType: string;
  category?: string;
};

export type CarCard = {
  id: number;
  name: string;
  img: string;
};