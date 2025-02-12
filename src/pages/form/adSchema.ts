import { z } from 'zod';

const adCategories = ['Недвижимость', 'Авто', 'Услуги'] as const;

const realEstateSchema = z.object({
  type: z.literal('Недвижимость'),
  propertyType: z.string().min(1),
  area: z.number().min(1),
  rooms: z.number().min(1),
  price: z.number().min(0),
});

const autoSchema = z.object({
  type: z.literal('Авто'),
  brand: z.string().min(1),
  model: z.string().min(1),
  year: z.number().min(1900),
  mileage: z.number().optional(),
});

const servicesSchema = z.object({
  type: z.literal('Услуги'),
  serviceType: z.string().min(1),
  experience: z.number().min(0),
  cost: z.number().min(0),
  workSchedule: z.string().optional(),
});

const adSchema = z
  .object({
    name: z.string().min(1),
    description: z.string().min(1),
    location: z.string().min(1),
    image: z.string().optional(),
    type: z.enum(adCategories).nullable(),
  })
  .and(
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

export { defaultValues, adSchema, adCategories, type AdSchema };
