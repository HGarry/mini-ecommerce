import { CartItem, Product } from "@/types/general-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  clearCart: () => void;
  // Derived Values
  getTotalQuantity: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      cart: [],

      addToCart: (product, quantity) => {
        set((state) => {
          const existingItem = state.cart.find(
            (item) => item.id === product.id
          );

          if (existingItem) {
            const updatedCart = state.cart.map((item) => {
              if (item.id === product.id) {
                return {
                  ...item,
                  quantity: item.quantity + quantity,
                };
              }
              return item;
            });
            return { cart: updatedCart };
          }

          const newItem = { ...product, quantity };
          return {
            cart: [...state.cart, newItem],
          };
        });
      },

      clearCart: () => set({ cart: [] }),

      // Derived Values (reduce သုံးပြီး စုစုပေါင်း တွက်ထုတ်ခြင်း)
      getTotalQuantity: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0
        );
      },
    }),
    {
      name: "cart",
    }
  )
);