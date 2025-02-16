const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const ItemTypes = {
  REAL_ESTATE: 'Недвижимость',
  AUTO: 'Авто',
  SERVICES: 'Услуги',
};

const app = express();
app.use(cors());
app.use(bodyParser.json());

// In-memory хранилище для объявлений
let items = [];

const makeCounter = () => {
  let count = 0;
  return () => count++;
};

const itemsIdCounter = makeCounter();

// Создание нового объявления
app.post('/items', (req, res) => {
  const { name, description, location, type, photo, ...rest } = req.body;

  // Validate common required fields
  if (!name || !description || !location || !type) {
    return res.status(400).json({ error: 'Missing required common fields' });
  }

  switch (type) {
    case ItemTypes.REAL_ESTATE:
      if (!rest.propertyType || !rest.area || !rest.rooms || !rest.price) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Real estate' });
      }
      break;
    case ItemTypes.AUTO:
      if (!rest.brand || !rest.model || !rest.year || !rest.mileage) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Auto' });
      }
      break;
    case ItemTypes.SERVICES:
      if (!rest.serviceType || !rest.experience || !rest.cost) {
        return res
          .status(400)
          .json({ error: 'Missing required fields for Services' });
      }
      break;
    default:
      return res.status(400).json({ error: 'Invalid type' });
  }

  const item = {
    id: itemsIdCounter(),
    name,
    description,
    location,
    type,
    photo,
    ...rest,
  };

  items.push(item);
  res.status(201).json(item);
});

// Получение всех объявлений.  Добавлен вывод с айтемов по страницам и с фильтрами
app.get('/items', (req, res) => {
  const { page = 1, limit = 5, search = '', type = '' } = req.query;
  const pageNumber = parseInt(page, 10);
  const limitNumber = parseInt(limit, 10);
  let filteredItems = items;

  if (search) {
    filteredItems = filteredItems.filter(
      (item) =>
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
    );
  }
  if (type) {
    filteredItems = filteredItems.filter((item) => item.type === type);
  }
  const startIndex = (pageNumber - 1) * limitNumber;
  const endIndex = startIndex + limitNumber;
  const paginatedItems = filteredItems.slice(startIndex, endIndex);

  res.json({
    total: filteredItems.length,
    page: pageNumber,
    limit: limitNumber,
    items: paginatedItems,
  });
});

// Получение объявления по его id
app.get('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Обновление объявления по его id
app.put('/items/:id', (req, res) => {
  const item = items.find((i) => i.id === parseInt(req.params.id, 10));
  if (item) {
    Object.assign(item, req.body);
    res.json(item);
  } else {
    res.status(404).send('Item not found');
  }
});

// Удаление объявления по его id
app.delete('/items/:id', (req, res) => {
  const itemIndex = items.findIndex(
    (i) => i.id === parseInt(req.params.id, 10)
  );
  if (itemIndex !== -1) {
    items.splice(itemIndex, 1);
    res.status(204).send();
  } else {
    res.status(404).send('Item not found');
  }
});

const testItems = [
  {
    id: itemsIdCounter(),
    name: 'Квартира в центре',
    description: 'Просторная квартира в центре города',
    location: 'Москва',
    photo: 'https://picsum.photos/400/300?random=1',
    type: 'Недвижимость',
    propertyType: 'Квартира',
    area: 100,
    rooms: 3,
    price: 15000000,
  },
  {
    id: itemsIdCounter(),
    name: 'Дача в Подмосковье',
    description: 'Уютная дача с участком 10 соток',
    location: 'Подмосковье',
    photo: 'https://picsum.photos/400/300?random=2',
    type: 'Недвижимость',
    propertyType: 'Дача',
    area: 80,
    rooms: 2,
    price: 5000000,
  },
  {
    id: itemsIdCounter(),
    name: 'Toyota Camry',
    description: 'Надежный автомобиль',
    location: 'Москва',
    type: 'Авто',
    brand: 'Toyota',
    model: 'Camry',
    year: 2020,
    mileage: 15000,
  },
  {
    id: itemsIdCounter(),
    name: 'Hyundai Solaris',
    description: 'Экономичный и практичный',
    location: 'Москва',
    type: 'Авто',
    brand: 'Hyundai',
    model: 'Solaris',
    year: 2021,
    mileage: 10000,
  },
  {
    id: itemsIdCounter(),
    name: 'Ремонт квартир',
    description: 'Качественный ремонт квартир',
    location: 'Москва',
    type: 'Услуги',
    serviceType: 'Ремонт',
    experience: 5,
    cost: 50000,
    workSchedule: 'Пн-Пт, 9:00-18:00',
  },
  {
    id: itemsIdCounter(),
    name: 'Уборка помещений',
    description: 'Профессиональная уборка офисов и квартир',
    location: 'Москва',
    type: 'Услуги',
    serviceType: 'Уборка',
    experience: 3,
    cost: 3000,
    workSchedule: 'Пн-Вс, 8:00-20:00',
  },
];
items.push(...testItems);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
