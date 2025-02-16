import { useState, useEffect, useCallback } from 'react';
import { Button, Pagination, Box, Container } from '@mui/material';
import Grid from '@mui/material/Grid2';
import { useNavigate } from 'react-router-dom';
import { Item, Categories } from '@api/types';
import { getItems } from '@api/api';
import { CategoryChips } from './CategoryChips';
import Search from './Search';
import CardComponent from './Card';
import { useFilterState } from '@hooks/useFilterState';
import { usePagination } from '@hooks/usePagination';
import { useQueryFilters } from '@hooks/useQueryFilters';
import Loader from '@components/Loader';

function ListPage() {
  const navigate = useNavigate();
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  const { search, type, setSearch, setType } = useFilterState();
  const { page, setPage, pageSize, onPageChange } = usePagination({
    total,
  });
  useQueryFilters({ search, type });

  const loadingItems = useCallback(async () => {
    setLoading(true);
    try {
      const { items, total } = await getItems({ page, search, type });
      setItems(items);
      setTotal(total);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }, [page, search, type]);

  useEffect(() => {
    loadingItems();
  }, [loadingItems]);

  const handleSearch = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearch(event.target.value);
      setPage(1);
    },
    [setSearch, setPage]
  );

  const handleChangeType = useCallback(
    (value: Categories) => {
      setType(value);
      setPage(1);
    },
    [setType, setPage]
  );
  const handleChangePagination = (
    event: React.ChangeEvent<unknown>,
    value: number
  ) => {
    setPage(value);
  };

  return (
    <Container
      maxWidth="lg"
      component="main"
      sx={{ display: 'flex', flexDirection: 'column', my: 16, gap: 4 }}
    >
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'row',
          gap: 1,
          width: { xs: '100%', md: 'fit-content' },
          overflow: 'auto',
        }}
      >
        <Search search={search} handleSearch={handleSearch} />
        <Button
          size="small"
          variant="contained"
          aria-label="add new advertismen button"
          onClick={() => navigate(`/form`)}
        >
          +
        </Button>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: { md: 'row' },
          width: '100%',
          justifyContent: 'space-between',
          alignItems: { xs: 'start', md: 'center' },
          gap: 4,
          overflow: 'auto',
        }}
      >
        <CategoryChips value={type} onChange={handleChangeType} />
        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            flexDirection: 'row',
            gap: 1,
            width: { xs: '100%', md: 'fit-content' },
            overflow: 'auto',
          }}
        >
          <Search search={search} handleSearch={handleSearch} />
          <Button
            variant="contained"
            size="small"
            onClick={() => navigate(`/form`)}
          >
            Разместить объявление
          </Button>
        </Box>
      </Box>
      {loading ? (
        <Loader />
      ) : (
        <Grid container spacing={2}>
          {items.map((ad) => (
            <CardComponent key={ad.id} {...ad} />
          ))}
        </Grid>
      )}
      <Pagination
        sx={{ display: 'flex', flexDirection: 'row', pt: 4 }}
        count={Math.ceil(total / pageSize)}
        page={page}
        onChange={handleChangePagination}
      />
    </Container>
  );
}
export default ListPage;
