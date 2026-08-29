import { CartItem, Product } from "@/types/general-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface CartState {
  cart: CartItem[];
  addToCart: (product: Product, quantity: number) => void;
  removeFromCart: (productId: string | number) => void;
  updateQuantity: (productId: string | number, delta: number) => void;
  clearCart: () => void;
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
            (item) => item.id === product.id,
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

          const newItem: CartItem = {
            ...product,
            thumbnail: product.thumbnail,
            quantity,
          };
          return {
            cart: [...state.cart, newItem],
          };
        });
      },

      removeFromCart: (productId) => {
        set((state) => ({
          cart: state.cart.filter(
            (item) => String(item.id) !== String(productId),
          ),
        }));
      },

      updateQuantity: (productId, delta) => {
        set((state) => ({
          cart: state.cart.flatMap((item) => {
            if (String(item.id) !== String(productId)) return [item];

            const quantity = item.quantity + delta;
            return quantity > 0 ? [{ ...item, quantity }] : [];
          }),
        }));
      },

      clearCart: () => set({ cart: [] }),

      getTotalQuantity: () => {
        return get().cart.reduce((sum, item) => sum + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().cart.reduce(
          (sum, item) => sum + item.price * item.quantity,
          0,
        );
      },
    }),
    {
      name: "cart",
    },
  ),
);
