import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

function Loader() {
  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      style={{ height: '50vh' }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
}
export default Loader;
