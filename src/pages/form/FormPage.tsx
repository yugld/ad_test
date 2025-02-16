import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AdSchema, adSchema, defaultValues } from './adSchema';
import { getItemById, updateItem, createItem } from '../../api/api';
import { CategoryFields } from './CategoryFields';
import { toast } from 'react-toastify';
import {
  Container,
  Typography,
  Stack,
  TextField,
  Button,
  Box,
} from '@mui/material';
import Loader from '@components/Loader';

function FormPage() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const id = params.get('id');
  const [initialValues, setInitialValues] = useState(defaultValues);
  const [loading, setLoading] = useState(false);

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
        setLoading(true);
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
            setLoading(false);
          }
        } catch (error) {
          toast('Ошибка при получении объявления');
        }
      }
      setLoading(false);
    };
    fetchItem();
  }, [id, reset, setValue]);

  const onSubmit: SubmitHandler<AdSchema> = async (data) => {
    if (id) {
      const idUpdate = parseInt(id, 10);
      await updateItem(idUpdate, data)
        .then(() => toast('Объявление сохранено!'))
        .catch(() =>
          toast('Не удалось сохранить объявление, попробуйте ещё раз')
        );
    } else {
      await createItem(data)
        .then(() => toast('Объявление опубликовано!'))
        .catch(() => toast('Ошибка публикации объявления, попробуйте ещё раз'));
    }
    navigate('/list');
  };

  return (
    <Container
      maxWidth="lg"
      sx={{
        my: 16,
        padding: 2,
      }}
    >
      {loading ? (
        <Loader />
      ) : (
        <Stack sx={{ gap: 2, maxWidth: '800px' }}>
          <Typography variant="h6">
            {id ? 'Редактирование объявления' : 'Новое объявление'}
          </Typography>
          <label>Название</label>
          <TextField
            label=""
            {...register('name')}
            helperText={errors.name?.message}
            error={!!errors.name}
          />
          <label>Описание</label>
          <TextField
            label=""
            {...register('description')}
            multiline
            helperText={errors.description?.message}
            error={!!errors.description}
          />
          <label>Локация</label>
          <TextField
            label=""
            {...register('location')}
            helperText={errors.location?.message}
            error={!!errors.location}
          />
          <label>Ссылка на фото</label>
          <TextField {...register('image')} label="" />
          <CategoryFields
            control={control}
            register={register}
            errors={errors}
          />
          <Box mt={2} sx={{ display: 'flex', gap: 1 }}>
            <Button variant="contained" onClick={handleSubmit(onSubmit)}>
              {id ? 'Сохранить изменения' : 'Опубликовать'}
            </Button>
            <Button onClick={() => navigate('/')}>Отменить и выйти</Button>
          </Box>
        </Stack>
      )}
    </Container>
  );
}
export default FormPage;
