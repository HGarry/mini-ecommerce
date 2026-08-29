export interface Product {
  id: number;
  title: string;
  price: number;
  thumbnail: string;
  category: string;
  description?: string;
  images?: string[];
  stock?: number;
}

export interface CartItem extends Product {
  quantity: number;
}
