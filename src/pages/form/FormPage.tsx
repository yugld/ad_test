import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdSchema, adSchema, defaultValues } from './adSchema';
import { getItemById, updateItem, createItem } from '../../api/api';
import { CategoryFields } from './CategoryFields';
import { Container, Typography, Stack, TextField, Button } from '@mui/material';

function FormPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get('id');
  const [initialValues, setInitialValues] = useState(defaultValues);

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AdSchema>({
    mode: 'all',
    resolver: zodResolver(adSchema),
    defaultValues: initialValues,
  });

  useEffect(() => {
    const fetchItem = async () => {
      if (id) {
        try {
          const itemId = parseInt(id, 10);
          const item = await getItemById(itemId);
          if (item) {
            setInitialValues(item);
            reset(item);
            if (item.type === 'Недвижимость' && item.propertyType) {
              setValue('propertyType', item.propertyType);
            }
            if (item.type === 'Авто' && item.brand) {
              setValue('brand', item.brand);
            }
            if (item.type === 'Услуги' && item.serviceType) {
              setValue('serviceType', item.serviceType);
            }
          }
        } catch (error) {
          console.error('Error fetching item:', error);
        }
      }
    };
    fetchItem();
  }, [id, reset, setValue]);

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
          label="Название"
          {...register('name')}
          helperText={errors.name?.message}
          error={!!errors.name}
        />
        <TextField
          label="Описание"
          {...register('description')}
          multiline
          helperText={errors.description?.message}
          error={!!errors.description}
        />
        <TextField
          label="Локация"
          {...register('location')}
          helperText={errors.location?.message}
          error={!!errors.location}
        />
        <TextField {...register('image')} label="Ссылка на фото" />
        <CategoryFields control={control} register={register} errors={errors} />
        <Button variant="contained" onClick={handleSubmit(onSubmit)}>
          {id ? 'Сохранить изменения' : 'Опубликовать'}
        </Button>
        <Button onClick={() => navigate('/')}>Отменить и выйти</Button>
      </Stack>
    </Container>
  );
}
export default FormPage;
