import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';

import { useNavigate } from 'react-router-dom';
import { Item } from '@api/types';
import { Button } from '@mui/material';

const SyledCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: (theme.vars || theme).palette.background.paper,
  '&:hover': {
    backgroundColor: 'transparent',
    cursor: 'pointer',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 4,
  padding: 16,
  flexGrow: 1,
});

const CardComponent = ({ id, name, photo, type, location }: Item) => {
  const navigate = useNavigate();
  return (
    <Grid size={{ xs: 12, md: 6, lg: 4, xl: 3 }}>
      <SyledCard
        variant="outlined"
        tabIndex={0}
        // onClick={() => navigate(`/item/${id}`)}
      >
        <CardMedia
          component="img"
          height="200"
          image={photo || 'src/assets/not-image.png'}
          alt={name}
          sx={{
            aspectRatio: '16 / 9',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />

        <SyledCardContent>
          <Typography gutterBottom variant="h6" component="div">
            {name}
          </Typography>
          <Typography gutterBottom component="div">
            {type}
            <Typography component="div">{location}</Typography>
          </Typography>
          Оставить или кнопку или ссылку по карточке
          <Button onClick={() => navigate(`/item/${id}`)}>Открыть</Button>
        </SyledCardContent>
      </SyledCard>
    </Grid>
  );
};

export default CardComponent;
