
import AccountInfo from "./AccountInfo";
import CartList from "./CartList";
import ManageAddress from "./ManageAddress";
import Orders from "./Orders";
import WishList from "./WishList";

export default function AccountPageRenderer({ route } : { route: string }) {
  if (route === "/my-orders") return <Orders />;
  if (route === "/my-wishlist") return <WishList />;
  if (route === "/my-account") return <AccountInfo />;
  if (route === "/manage-address") return <ManageAddress />;
  // if (route === "/my-reviews") return <ShowReview />;
  if (route === "/my-cart") return <CartList />;
  return null;
}
