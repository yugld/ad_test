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
import { getItemById } from '@api/api';
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
    const data = await getItemById(id);
    setItem(data);
    setLoading(false);
  }, [idItem]);

  useEffect(() => {
    loadItem();
  }, [loadItem]);

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
      {item ? (
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
            <Box mt={2}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate(`/form?id=${item.id}`)}
              >
                Редактировать
              </Button>
            </Box>
          </CardContent>
        </>
      ) : (
        <div>Объявление не найдено</div>
      )}
    </Container>
  );
}

export default ItemPage;
