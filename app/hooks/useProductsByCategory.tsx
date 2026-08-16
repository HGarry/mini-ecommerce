import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useCategoryStore } from "../store/useCategoryStore";

export const useProductsByCategory = () => {
    const {selectedCategory} = useCategoryStore();
    const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL

  return useQuery({
    queryKey: ["products", selectedCategory],
    queryFn: async () => {
      const response = await axios.get(
        `${BASE_URL}/products/category/${selectedCategory}`,
      );
      return response.data;
    },
  });
};
