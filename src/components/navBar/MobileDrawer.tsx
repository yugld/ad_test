import { useState } from 'react';
import {
  Box,
  IconButton,
  Drawer,
  MenuItem,
  Divider,
  Button,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import { Link } from 'react-router-dom';
const buttons = [
  { text: 'Объявления', path: '/list' },
  { text: 'Разместить объявление', path: '/form' },
  { text: 'Ошибка', path: '/error' },
];

export default function MobileDrawer() {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <Box sx={{ display: { xs: 'flex', md: 'none' }, gap: 1 }}>
      <IconButton aria-label="Menu button" onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer anchor="top" open={open} onClose={toggleDrawer(false)}>
        <Box sx={{ p: 2, backgroundColor: 'background.default' }}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton onClick={toggleDrawer(false)}>
              <CloseRoundedIcon />
            </IconButton>
          </Box>
          {buttons.map(({ text, path }) => (
            <MenuItem key={path} component={Link} to={path}>
              {text}
            </MenuItem>
          ))}
          <Divider sx={{ my: 3 }} />
          <MenuItem>
            <Button color="primary" variant="contained" fullWidth>
              Регистрация
            </Button>
          </MenuItem>
          <MenuItem>
            <Button color="primary" variant="outlined" fullWidth>
              Вход
            </Button>
          </MenuItem>
        </Box>
      </Drawer>
    </Box>
  );
}
