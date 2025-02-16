import { Box, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const buttons = [
  { text: 'Объявления', path: '/list' },
  { text: 'Страница ошибки', path: '/error' },
];

export default function NavBarButtons() {
  return (
    <>
      <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', px: 0 }}>
        <Logo />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          {buttons.map(({ text, path }) => (
            <Button
              key={path}
              to={path}
              component={Link}
              variant="text"
              color="info"
              size="small"
            >
              {text}
            </Button>
          ))}
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: 1,
          alignItems: 'center',
        }}
      >
        <Button color="primary" variant="text" size="small">
          Вход
        </Button>
        <Button color="primary" variant="contained" size="small">
          Регистрация
        </Button>
      </Box>
    </>
  );
}
