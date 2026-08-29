"use client";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCartStore } from "../store/useCartStore";
import { Product } from "@/types/general-types";

interface CustomButtonProps {
  product: Product;
}

function CustomButton({ product }: CustomButtonProps) {
  const addToCart = useCartStore((state) => state.addToCart);
  return (
    <button
      type="button"
      className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg border border-purple-600 px-4 py-2 font-medium text-purple-600 transition-colors duration-200 hover:bg-purple-600 hover:text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
      onClick={() => addToCart(product, 1)}
    >
      <AddShoppingCartIcon fontSize="small" />
      ADD TO CART
    </button>
  );
}

export default CustomButton;
