import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../../api/auth/[...nextauth]/authOptions";
import apiService from "../../../../services/api";
import InnerWishlist from "./InnerWishlist";

export const revalidate = 0;
export const dynamic = "force-dynamic";

export default async function Wishlist() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/auth/signin");
  }

  const token = (session.user as any)?.token as string;
  const wishlistData = await apiService.getWishlist(token);
  const products = wishlistData?.data ?? [];

  return <InnerWishlist products={products} token={token} />;
}
