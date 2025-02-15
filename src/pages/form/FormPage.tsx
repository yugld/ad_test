import { createItem, updateItem, getItemById } from '@api/api';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Button,
  Container,
  FormControl,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Controller, SubmitHandler, useForm, useWatch } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AdSchema, adSchema, defaultValues, adCategories } from './adSchema';
import { useEffect, useState } from 'react';

function FormPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get('id');
  const [initialValues, setInitialValues] = useState(defaultValues);
  const {
    register,
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<AdSchema>({
    mode: 'all',
    resolver: zodResolver(adSchema),
    defaultValues: initialValues,
  });

  const category = useWatch({ control, name: 'type' });

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        try {
          const itemId = parseInt(id, 10);
          const item = await getItemById(itemId);
          if (item) {
            setInitialValues(item);
            reset(item);
          }
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      }
    };

    fetchItem();
  }, [id, reset]);

  const onSubmit: SubmitHandler<AdSchema> = async (data) => {
    if (id) {
      const idUpdate = parseInt(id, 10);
      await updateItem(idUpdate, data);
    } else {
      await createItem(data);
    }
    navigate('/list');
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        my: 16,
        gap: 4,
        width: 700,
        padding: 2,
      }}
    >
      <Stack sx={{ gap: 2 }}>
        <Typography variant="h6">
          {id ? 'Редактирование объявления' : 'Новое объявление'}
        </Typography>
        <TextField
          {...register('name')}
          label="Название"
          helperText={errors.name?.message}
          error={!!errors.name}
        />
        <TextField
          {...register('description')}
          label="Описание"
          multiline
          helperText={errors.description?.message}
          error={!!errors.description}
        />
        <TextField
          {...register('location')}
          label="Локация"
          helperText={errors.location?.message}
          error={!!errors.location}
        />
        <TextField {...register('image')} label="Ссылка на фото" />
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
            <TextField
              {...register('propertyType')}
              label="Тип недвижимости"
              helperText={errors.propertyType?.message}
              error={!!errors.propertyType}
              select
            >
              <MenuItem value="Квартира">Квартира</MenuItem>
              <MenuItem value="Дом">Дом</MenuItem>
              <MenuItem value="Коттедж">Коттедж</MenuItem>
            </TextField>
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
            <TextField
              {...register('brand')}
              label="Марка"
              helperText={errors.brand?.message}
              error={!!errors.brand}
              select
            >
              <MenuItem value="Audi">Audi</MenuItem>
              <MenuItem value="Volkswagen">Volkswagen</MenuItem>
              <MenuItem value="BMW">BMW</MenuItem>
            </TextField>
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
            <TextField
              {...register('serviceType')}
              label="Тип услуги"
              helperText={errors.serviceType?.message}
              error={!!errors.serviceType}
              select
            >
              <MenuItem value="Ремонт">Ремонт</MenuItem>
              <MenuItem value="Уборка">Уборка</MenuItem>
              <MenuItem value="Доставка">Доставка</MenuItem>
            </TextField>
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
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {id ? 'Сохранить изменения' : 'Опубликовать'}
        </Button>
        <Button onClick={() => navigate('/')}>Отменить и выйти</Button>
      </Stack>
    </Container>
  );
}

export default FormPage;
