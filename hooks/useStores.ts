import { useCallback } from 'react';
import { Store } from '../types/store';
import { mutate } from 'swr';

export const STORE_KEY = '/stores';

// 매장 정보를 전역으로 관리하기 위해 store 생성
const useStores = () => {
  const initializeStores = useCallback((stores: Store[]) => {
    mutate(STORE_KEY, stores);
  }, []);

  return {
    initializeStores,
  };
};

export default useStores;
