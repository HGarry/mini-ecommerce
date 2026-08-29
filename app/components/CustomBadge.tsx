"use client";

import { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import Badge, { badgeClasses } from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCartOutlined";
import Link from "next/link";
import { useCartStore } from "../store/useCartStore";
// import { useCartStore } from "@/store/useCartStore"; // မိမိ store path အမှန်သို့ ပြင်ပေးပါ

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;

export default function IconButtonWithBadge() {
  const [isMounted, setIsMounted] = useState(false);

  const totalQuantity = useCartStore((state) => state.getTotalQuantity());

  useEffect(() => {
    const frame = requestAnimationFrame(() => setIsMounted(true));

    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <Link href="/cart">
      <IconButton
        aria-label={`view cart with ${isMounted ? totalQuantity : 0} items`}
      >
        <ShoppingCartIcon fontSize="small" sx={{ color: "#fff" }} />
        <CartBadge
          badgeContent={isMounted ? totalQuantity : 0}
          color="success"
          overlap="circular"
        />
      </IconButton>
    </Link>
  );
}
