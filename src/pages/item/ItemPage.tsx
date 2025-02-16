import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Button,
  Box,
  Typography,
  CardContent,
  CardMedia,
  Container,
} from '@mui/material';
import { getItemById, deleteItem } from '@api/api';
import { Categories, Item } from '@api/types';
import Loader from '@components/Loader';
import { toast } from 'react-toastify';

function ItemPage() {
  const { id: idItem } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [item, setItem] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const loadItem = useCallback(async () => {
    if (!idItem) return;
    const id = parseInt(idItem, 10);
    setLoading(true);
    try {
      const data = await getItemById(id);
      setItem(data);
    } catch (error) {
      toast('Ошибка при получении объявления');
    } finally {
      setLoading(false);
    }
  }, [idItem]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

  const handleDelete = async () => {
    const itemId = item.id;
    try {
      await deleteItem(itemId).then(() => toast('Объявление удалено!'));
      navigate('/');
    } catch (error) {
      toast('Не удалось удалить объявление');
    }
  };

  const renderItemDetails = () => {
    switch (item.type) {
      case Categories.AUTO:
        return (
          <>
            <p>Модель: {item.model}</p>
            <p>Марка:{item.brand}</p>
            <p>Год выпуска:{item.year}</p>
            <p>Пробег:{item.mileage}</p>
          </>
        );
      case Categories.REAL_ESTATE:
        return (
          <>
            <p>Тип недвижимости:{item.propertyType}</p>
            <p>Площадь:{item.area}</p>
            <p>Цена:{item.price}</p>
            <p>Кол-во комнат:{item.rooms}</p>
          </>
        );
      case Categories.SERVICES:
        return (
          <>
            <p>Тип услуги:{item.serviceType}</p>
            <p>Опыт работы:{item.experience}</p>
            <p>Стоимость:{item.cost}</p>
            <p>График работы:{item.workSchedule}</p>
          </>
        );
      default:
        return <>Детали не загрузились...</>;
    }
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
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 4,
          }}
        >
          <CardMedia
            component="img"
            image={item.photo || '../../src/assets/not-image.png'}
            alt={item.name}
            sx={{
              border: '1px solid',
              borderColor: 'divider',
              width: { xs: '100%', md: '60%' },
              textAlign: 'center',
            }}
          />
          <CardContent sx={{ width: { xs: '100%', md: '40%' } }}>
            <Typography variant="h5" component="div">
              {item.name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="main"
              color="text.secondary"
            >
              {item.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {item.location}
            </Typography>
            {renderItemDetails()}
            <Box mt={2} sx={{ display: 'flex', gap: 1 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/form?id=${item.id}`)}
              >
                Редактировать
              </Button>
              <Button variant="outlined" onClick={handleDelete}>
                Удалить
              </Button>
            </Box>
          </CardContent>
        </Box>
      )}
    </Container>
  );
}

export default ItemPage;
