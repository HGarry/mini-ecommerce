"use client";
import React from "react";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import { useCartStore } from "../store/useCartStore";
import Button from "@mui/material/Button";
import Link from "next/link";

function CustomButton({ product }) {
    const {cart,addToCart} = useCartStore((state) => state);
    console.log(cart)
  return (
    
    <Button
      
      sx={{ mt: 2 }}
      variant="outlined"
      startIcon={<AddShoppingCartIcon />}
      onClick={() => addToCart(product, 1)}
    >
      ADD TO CART
    </Button>
    
    
  );
}

export default CustomButton;
