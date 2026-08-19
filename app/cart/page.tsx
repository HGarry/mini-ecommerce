"use client";
import { CartItem } from "@/types/general-types";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import React from "react";
import { useCartStore } from "../store/useCartStore";
// import { useCartStore } from "../store/useCartStore";

// interface CartPage {
// cartItems: CartItem;
// }

function Cart() {
    const { cart } = useCartStore((state) => state);
    const totalQuantity = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);

    return (
        <div className="">
            {cart.map((cart, index) => {
                return <p key={index}>{cart.title}</p>;
            })}
            total quantity - {totalQuantity}
        </div>
    );
}

export default Cart;
