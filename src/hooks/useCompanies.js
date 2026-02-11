import { useEffect, useState } from 'react';
import { fetchCompanies } from '../services/api';

const useCompanies = () => {
  const [companies, setCompanies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchCompanies();
        if (isMounted) setCompanies(data);
      } catch (err) {
        if (isMounted) setError(err);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    load();

    return () => {
      isMounted = false;
    };
  }, []);

  return { companies, isLoading, error };
};

export default useCompanies;
