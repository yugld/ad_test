import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { Item } from '@api/types';

const SyledCard = styled(Card)(() => ({
  display: 'flex',
  flexDirection: 'column',
  padding: 0,
  height: '100%',
  backgroundColor: 'transparent',
  gap: '0',
  '&:hover': {
    cursor: 'pointer',
  },
}));

const SyledCardContent = styled(CardContent)({
  display: 'flex',
  flexDirection: 'column',
  gap: 2,
  padding: 16,
  flexGrow: 1,
});

const CardComponent = ({ id, name, photo, type, location }: Item) => {
  const navigate = useNavigate();
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }}>
      <SyledCard tabIndex={0} onClick={() => navigate(`/item/${id}`)}>
        <CardMedia
          component="img"
          height="300"
          image={photo || 'src/assets/not-image.png'}
          alt={name}
          sx={{
            aspectRatio: '16 / 9',
            borderBottom: '1px solid',
            borderColor: 'divider',
          }}
        />
        <SyledCardContent>
          <Typography variant="h6" component="div">
            {name}
          </Typography>
          <Typography component="div">
            {type}
            <Typography gutterBottom component="div">
              {location}
            </Typography>
          </Typography>
          {/* <Button onClick={() => navigate(`/item/${id}`)}>Открыть</Button>  Оставила без кнопки, потому что интуитивно переход по лубоой части карточки более удобен*/}
        </SyledCardContent>
      </SyledCard>
    </Grid>
  );
};

export default CardComponent;
