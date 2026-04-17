'use client'

import React, { useEffect } from 'react'
import apiService from '@services/api'
import ShoppingCart from './InnerCart'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import PageLoader from '@/components/ui/PageLoader'
import { useState } from 'react'

export default function Cart() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [cartData, setCartData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'authenticated' && session?.user?.token) {
      fetchCartData();
    }
  }, [status, session]);

  const fetchCartData = async () => {
    try {
      setIsLoading(true);
      const data = await apiService.getCart(session?.user?.token as string);
      setCartData(data);
    } catch (error) {
      console.error('Error fetching cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (status === 'loading' || isLoading) {
    return <PageLoader />;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <ShoppingCart cart={cartData} token={session.user?.token as string} />
    </div>
  )
}
