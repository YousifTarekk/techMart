import React from 'react'
import apiService from '../../../../services/api'
import ShoppingCart from './InnerCart'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../../api/auth/[...nextauth]/authOptions'

export const revalidate = 0;
export const dynamic = 'force-dynamic';

export default async function Cart() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/auth/signin');
  }

  const cartData = await apiService.getCart(session.user?.token as string);

  return (
    <div>
      <ShoppingCart cart={cartData} token={session.user?.token as string} />
    </div>
  )
}
