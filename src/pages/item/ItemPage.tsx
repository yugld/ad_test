import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Button,
  CircularProgress,
  Box,
  Typography,
  CardContent,
  CardMedia,
  Container,
} from '@mui/material';
import { getItemById, deleteItem } from '@api/api';
import { Categories, Item } from '@api/types';

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
      console.error('Error fetching item:', error);
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
      await deleteItem(itemId);
      navigate('/');
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  if (loading) return <CircularProgress />;

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
        gap: 4,
        width: 700,
        padding: 2,
      }}
    >
      <>
        <CardMedia
          component="img"
          height="300"
          image={item.photo || '../../src/assets/not-image.png'}
          alt={item.name}
          sx={{
            aspectRatio: '16 / 9',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
        <CardContent>
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
          <Box mt={2} sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate(`/form?id=${item.id}`)}
            >
              Редактировать
            </Button>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Удалить
            </Button>
          </Box>
        </CardContent>
      </>
    </Container>
  );
}

export default ItemPage;
