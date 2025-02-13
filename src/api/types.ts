export enum Categories {
  REAL_ESTATE = 'Недвижимость',
  AUTO = 'Авто',
  SERVICES = 'Услуги',
}

export type BaseItem = {
  id: number;
  name: string;
  description: string;
  location: string;
  type: Categories;
  photo?: string;
};

export type RealEstateItem = BaseItem & {
  propertyType: string;
  area: number;
  rooms: number;
  price: number;
};

export type AutoItem = BaseItem & {
  brand: string;
  model: string;
  year: number;
  mileage?: number;
};

export type ServiceItem = BaseItem & {
  serviceType: string;
  experience: number;
  cost: number;
  workSchedule?: string;
};

export type Item = RealEstateItem | AutoItem | ServiceItem;

export interface ItemResponse {
  items: Item[];
}

export type ApiError = {
  error: string;
};

export type GetParams = {
  page: number;
  limit: number;
  type: string;
  search: string;
};
