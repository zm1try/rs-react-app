'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { Loader } from '@/components/Loader/Loader.tsx';
import { useEffect } from 'react';

export const InitialLoader = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams.get('page')) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', '1');
      router.replace(`?${params.toString()}`);
    }
  }, [router, searchParams]);

  return <Loader />;
};
