import {
  DependencyList,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

const useAsyncState = <T>(
  fn: () => Promise<T>,
  deps: DependencyList = [],
): ReturnType<T> => {
  const [loading, setLoading] = useState(false);
  const re = useRef(deps);
  const [state, setState] = useState<T | undefined>(undefined);

  const fetchAsync = useCallback(async () => {
    setLoading(true);
    setState(await fn());
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchAsync();
  }, re.current);

  return [state, loading, fetchAsync];
};

export default useAsyncState;

type ReturnType<T> = [T | undefined, boolean, () => Promise<void>];
