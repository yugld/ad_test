import { useEffect, useRef } from 'react';
import qs from 'qs';
import { removeEmpty } from '../utils';
import { Categories } from '@api/types';

type Filters = {
  type: Categories;
  search: string;
};

export const useQueryFilters = (filters: Partial<Filters>) => {
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      const params = removeEmpty({
        ...filters,
      });

      const query = qs.stringify(params, {
        arrayFormat: 'comma',
      });

      window.history.pushState(null, '', `?${query}`);
    }

    isMounted.current = true;
  }, [filters]);
};
