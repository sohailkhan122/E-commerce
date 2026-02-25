"use client";
import { useState, useEffect, useContext } from "react";
import Link from "next/link";
import {
  HeartOutlined,
  UserOutlined,
  ShoppingOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Button, Badge } from "antd";
import noteContext from "@/context/noteContext";
import { getCart } from "@/app/api/cart"; // axios instance with token

const navLinks = [
  { label: "Men", href: "/product_list/Men" },
  { label: "Women", href: "/product_list/Women" },
  { label: "Joggers", href: "/product_list/Shoes" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [productsLength, setProductsLength] = useState(0);
  const { refresh } = useContext(noteContext);

  // Fetch cart count (token handled by backend middleware)
  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const res = await getCart();
        const cartItem = res?.cartItem || res?.data;
        // console.log("Cart item in header fetch:", res);

        if (!cartItem || !cartItem.products || cartItem.products.length === 0) {
          setProductsLength(0);
        } else {
          // ✅ Only distinct products count
          setProductsLength(cartItem.products.length);
        }
      } catch (error) {
        console.error("Cart fetch error:", error);
        setProductsLength(0);
      }
    };

    fetchCartCount();
  }, [refresh]);

  // console.log("Cart count in header:", productsLength);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">

        {/* Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold tracking-widest uppercase text-foreground">
            EUPHORIA
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-10 md:flex absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium tracking-wide uppercase text-foreground transition-colors hover:text-accent"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Desktop Icons */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link href="/wishlist">
            <Button className="border-none shadow-none" type="text">
              <HeartOutlined style={{ fontSize: 20 }} />
            </Button>
          </Link>

          <Link href="/my_order">
            <Button className="border-none shadow-none" type="text">
              <UserOutlined style={{ fontSize: 20 }} />
            </Button>
          </Link>

          <Link href="/cart_page">
            <Badge count={productsLength} size="small" overflowCount={99}>
              <Button className="border-none shadow-none" type="text">
                <ShoppingOutlined style={{ fontSize: 20 }} />
              </Button>
            </Badge>
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden">
          <Button type="text" onClick={() => setOpen(!open)}>
            {open ? <CloseOutlined style={{ fontSize: 20 }} /> : <MenuOutlined style={{ fontSize: 20 }} />}
          </Button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 px-3 rounded-md text-sm font-medium uppercase text-foreground/70 hover:text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="border-t border-border px-4 py-3 flex flex-col gap-2">
            <Link
              href="/wishlist"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2 px-3 rounded-md text-sm text-foreground/70 hover:text-foreground hover:bg-secondary"
            >
              <HeartOutlined style={{ fontSize: 18 }} />
              Wishlist
            </Link>

            <Link
              href="/my_order"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2 px-3 rounded-md text-sm text-foreground/70 hover:text-foreground hover:bg-secondary"
            >
              <UserOutlined style={{ fontSize: 18 }} />
              My Info
            </Link>

            <Link
              href="/cart_page"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3 py-2 px-3 rounded-md text-sm text-foreground/70 hover:text-foreground hover:bg-secondary"
            >
              <Badge count={productsLength} size="small" overflowCount={99}>
                <ShoppingOutlined style={{ fontSize: 18 }} />
              </Badge>
              <span className="ml-2">Shopping Bag</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
