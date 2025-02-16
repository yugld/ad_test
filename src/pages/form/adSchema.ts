import { z } from 'zod';

const adCategories = ['Недвижимость', 'Авто', 'Услуги'] as const;
const adPropetyTypes = ['Квартира', 'Дача', 'Коттедж'] as const;
const adBrands = ['Audi', 'Volkswagen', 'BMW'] as const;
const adServiceTypes = ['Ремонт', 'Уборка', 'Доставка'] as const;

const numberValidation = z
  .number({
    message: 'Обязательное поле, должно быть числом',
  })
  .min(1, { message: 'Число больше 0' });

const stringValidation = z
  .string()
  .min(2, { message: 'Обязательное поле, минимум 2 символа' });

const numberValidationMin0 = numberValidation.min(0, {
  message: 'Число больше 0',
});

const numberValidationMin1 = numberValidation.min(1, {
  message: 'Число больше 0',
});

const realEstateSchema = z.object({
  type: z.literal('Недвижимость'),
  propertyType: z.enum(adPropetyTypes, { message: 'Выберите из списка' }),
  area: numberValidationMin1,
  rooms: numberValidationMin1,
  price: numberValidationMin1,
});

const autoSchema = z.object({
  type: z.literal('Авто'),
  brand: z.enum(adBrands, { message: 'Выберите из списка' }),
  model: stringValidation,
  year: numberValidation.min(1885, {
    message: 'Число больше 1885 и меньше 2026',
  }),
  mileage: numberValidationMin0.optional(),
});

const servicesSchema = z.object({
  type: z.literal('Услуги'),
  serviceType: z.enum(adServiceTypes, { message: 'Выберите из списка' }),
  experience: numberValidationMin1,
  cost: numberValidationMin1,
  workSchedule: stringValidation.optional(),
});

const baseAdSchema = z.object({
  name: stringValidation,
  description: stringValidation,
  location: stringValidation,
  image: z.string().optional(),
  type: z.enum(adCategories, { message: 'Выберите из списка' }),
});

const adSchema = baseAdSchema.and(
  z.discriminatedUnion('type', [realEstateSchema, autoSchema, servicesSchema])
);
type AdSchema = z.infer<typeof adSchema>;

const defaultValues: AdSchema = {
  name: '',
  description: '',
  location: '',
  image: '',
  type: '',
  propertyType: '',
  area: 0,
  rooms: 0,
  price: 0,
  brand: '',
  model: '',
  year: 0,
  mileage: 0,
  serviceType: '',
  experience: 0,
  cost: 0,
  workSchedule: '',
};

export {
  defaultValues,
  adSchema,
  adCategories,
  adPropetyTypes,
  adBrands,
  adServiceTypes,
  type AdSchema,
};
