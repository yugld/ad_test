import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Categories } from '@api/types';

export const useFilterState = () => {
  const [search, setSearch] = useState('');
  const [type, setType] = useState<Categories | undefined>(undefined);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const searchParam = searchParams.get('search');
    const typeParam = searchParams.get('type');
    setSearch(searchParam || '');
    setType(typeParam ? (typeParam as Categories) : undefined);
  }, [searchParams]);

  return useMemo(
    () => ({
      search,
      type,
      setSearch,
      setType,
    }),
    [search, type]
  );
};
