import {
  Control,
  Controller,
  UseFormRegister,
  useWatch,
} from 'react-hook-form';
import {
  FormControl,
  MenuItem,
  Select,
  FormHelperText,
  TextField,
} from '@mui/material';
import {
  adCategories,
  adPropetyTypes,
  adBrands,
  adServiceTypes,
  AdSchema,
} from './adSchema';

interface CategoryFieldsProps {
  control: Control<AdSchema>;
  register: UseFormRegister<AdSchema>;
  errors: any;
}

export const CategoryFields: React.FC<CategoryFieldsProps> = ({
  control,
  register,
  errors,
}) => {
  const category = useWatch({ control, name: 'type' });

  return (
    <>
      <FormControl fullWidth>
        Категория
        <Controller
          control={control}
          name="type"
          render={({ field }) => (
            <Select {...field} displayEmpty>
              <MenuItem value="" disabled>
                Выбрать категорию
              </MenuItem>
              {adCategories.map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </Select>
          )}
        />
      </FormControl>
      {category === 'Недвижимость' && (
        <>
          <FormControl fullWidth error={!!errors.propertyType}>
            <label>Тип недвижимости</label>
            <Controller
              control={control}
              name="propertyType"
              render={({ field }) => (
                <>
                  <Select {...field} displayEmpty>
                    <MenuItem value="" disabled>
                      Выбрать тип
                    </MenuItem>
                    {adPropetyTypes.map((propertyType) => (
                      <MenuItem key={propertyType} value={propertyType}>
                        {propertyType}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.propertyType && (
                    <FormHelperText>
                      {errors.propertyType.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
          <TextField
            type="number"
            {...register('area', { valueAsNumber: true })}
            label="Площадь в квадратных метрах"
            error={!!errors.area}
            helperText={errors.area?.message}
          />
          <TextField
            type="number"
            {...register('rooms', { valueAsNumber: true })}
            label="Количество комнат"
            error={!!errors.rooms}
            helperText={errors.rooms?.message}
          />
          <TextField
            type="number"
            {...register('price', { valueAsNumber: true })}
            label="Цена в рублях"
            error={!!errors.price}
            helperText={errors.price?.message}
          />
        </>
      )}
      {category === 'Авто' && (
        <>
          <FormControl fullWidth error={!!errors.brand}>
            <label>Марка</label>
            <Controller
              control={control}
              name="brand"
              render={({ field }) => (
                <>
                  <Select {...field} displayEmpty>
                    <MenuItem value="" disabled>
                      Выбрать марку
                    </MenuItem>
                    {adBrands.map((brand) => (
                      <MenuItem key={brand} value={brand}>
                        {brand}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.brand && (
                    <FormHelperText>{errors.brand.message}</FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
          <TextField
            {...register('model')}
            label="Модель"
            helperText={errors.model?.message}
            error={!!errors.model}
          />
          <TextField
            type="number"
            {...register('year', { valueAsNumber: true })}
            label="Год выпуска"
            helperText={errors.year?.message}
            error={!!errors.year}
          />
          <TextField
            type="number"
            {...register('mileage', { valueAsNumber: true })}
            label="Пробег в километрах"
          />
        </>
      )}
      {category === 'Услуги' && (
        <>
          <FormControl fullWidth error={!!errors.serviceType}>
            <label htmlFor="serviceType-select">Тип услуги</label>
            <Controller
              control={control}
              name="serviceType"
              render={({ field }) => (
                <>
                  <Select
                    {...field}
                    id="serviceType-select"
                    displayEmpty
                    inputProps={{ 'aria-label': 'Тип услуги' }}
                  >
                    <MenuItem value="" disabled>
                      Выбрать тип
                    </MenuItem>
                    {adServiceTypes.map((type) => (
                      <MenuItem key={type} value={type}>
                        {type}
                      </MenuItem>
                    ))}
                  </Select>
                  {errors.serviceType && (
                    <FormHelperText>
                      {errors.serviceType.message}
                    </FormHelperText>
                  )}
                </>
              )}
            />
          </FormControl>
          <TextField
            type="number"
            {...register('experience', { valueAsNumber: true })}
            label="Опыт работы в годах"
            helperText={errors.experience?.message}
            error={!!errors.experience}
          />
          <TextField
            type="number"
            {...register('cost', { valueAsNumber: true })}
            label="Стоимость услуги в рублях"
            helperText={errors.cost?.message}
            error={!!errors.cost}
          />
          <TextField {...register('workSchedule')} label="График работы" />
        </>
      )}
    </>
  );
};
