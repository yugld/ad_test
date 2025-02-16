import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

export const NotFound = () => {
  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
      <div className="">
        <h1>Такой страницы не существует...</h1>
        <Button href="/" variant="contained">
          Вернуться на главную
        </Button>
      </div>
    </Container>
  );
};
