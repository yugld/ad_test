export enum Categories {
  REAL_ESTATE = 'Недвижимость',
  AUTO = 'Авто',
  SERVICES = 'Услуги',
}

export interface BaseItem {
  id: number;
  name: string;
  description: string;
  location: string;
  type: Categories;
  photo?: string;
}

export interface RealEstateItem extends BaseItem {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
}

export interface AutoItem extends BaseItem {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
}

export interface ServiceItem extends BaseItem {
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
}

export type Item = RealEstateItem | AutoItem | ServiceItem;

export interface ItemResponse {
  items: Item[];
}

export interface ApiError {
  error: string;
}
