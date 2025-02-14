import { Button } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Logo() {
  return (
    <Button
      to="/list"
      component={Link}
      variant="text"
      sx={{ fontSize: '1.5rem', fontWeight: 'bold' }}
    >
      Авито
    </Button>
  );
}
