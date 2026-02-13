"use client"
import { useState, useEffect, useContext } from "react"
import Link from "next/link"
import {
  HeartOutlined,
  UserOutlined,
  ShoppingOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons"
import { Button } from "antd"
import { usePathname } from "next/navigation";
import axios from "axios";
import noteContext from "@/context/noteContext";

const navLinks = [
  { label: "Men", href: `/product_list/${"men"}` },
  { label: "Women", href: `/product_list/${"women"}` },
  { label: "Joggers", href: `/product_list/${"joggers"}` },
]

const Header = () => {
  const [open, setOpen] = useState(false)
  const [productsLength, setProductsLength] = useState(0);
  const { refresh } = useContext(noteContext);

  useEffect(() => {
    const userId = JSON.parse(localStorage.getItem("userData"));
    if (!userId) {
      setProductsLength(0);
    } else {
      const fetchData = async () => {
        try {
          const response = await axios.get(
            `${process.env.NEXT_PUBLIC_API_URL}/cart/getCartItem/${userId._id}`,
          );
          setProductsLength(response.data.cartItem.products.length);
        } catch (error) {
          console.error("Error fetching data:", error)
        }
      };
      fetchData();
    }
  }, [refresh]);
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Left: Logo */}
        <Link href="/" className="shrink-0">
          <span className="text-xl font-bold tracking-widest uppercase text-foreground">
            EUPHORIA
          </span>
        </Link>

        {/* Center: Navigation (desktop) */}
        <nav
          className="hidden items-center gap-10 md:flex absolute left-1/2 -translate-x-1/2"
          aria-label="Main navigation"
        >
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

        {/* Right: Icons (desktop) */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Button className="border-none shadow-none" variant="ghost" size="icon" aria-label="Wishlist">
            <Link href="/wishlist">
              <HeartOutlined style={{ fontSize: 20 }} />
            </Link>
          </Button>
          <Button className="border-none shadow-none" variant="ghost" size="icon" aria-label="My account">
            <Link href="/my_order">
              <UserOutlined style={{ fontSize: 20 }} />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="relative border-none shadow-none"
            aria-label="Shopping bag"
          >
            <Link href="/cart_page">
              <ShoppingOutlined style={{ fontSize: 20 }} />
              <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-accent-foreground">
                {productsLength}
              </span>
            </Link>
          </Button>
        </div>

        {/* Mobile: Menu button */}
        <div className="flex md:hidden">
          <Button
            variant="ghost"
            size="icon"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen(!open)}
          >
            {open ? (
              <CloseOutlined style={{ fontSize: 20 }} />
            ) : (
              <MenuOutlined style={{ fontSize: 20 }} />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {open && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col px-4 py-4 gap-1" aria-label="Mobile navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="flex items-center py-3 px-3 rounded-md text-sm font-medium tracking-wide uppercase text-foreground/70 transition-colors hover:text-foreground hover:bg-secondary"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="border-t border-border px-4 py-3">
            <div className="flex flex-col gap-1">
              <Link
                href="/wishlist"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-md text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-secondary"
              >
                <HeartOutlined style={{ fontSize: 18 }} />
                Wishlist
              </Link>
              <Link
                href="/my_order"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-md text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-secondary"
              >
                <UserOutlined style={{ fontSize: 18 }} />
                My Info
              </Link>
              <Link
                href="/cart_page"
                onClick={() => setOpen(false)}
                className="flex items-center gap-3 py-3 px-3 rounded-md text-sm font-medium text-foreground/70 transition-colors hover:text-foreground hover:bg-secondary"
              >
                <ShoppingOutlined style={{ fontSize: 18 }} />
                Shopping Bag
                <span className="ml-auto flex h-5 w-5 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-foreground ">
                  {productsLength}
                </span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
