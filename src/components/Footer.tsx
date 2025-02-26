import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

export default function Footer() {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        textAlign: { sm: 'center', md: 'left' },
        borderTop: '1px solid',
        borderColor: 'divider',
        py: { xs: 4 },
        width: '100%',
      }}
    >
      <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
        {' © '}
        <Link
          color="text.secondary"
          href="https://github.com/yugld"
          target="_blank"
        >
          Yugld
        </Link>
        &nbsp;
        {new Date().getFullYear()}
      </Typography>
    </Container>
  );
}
