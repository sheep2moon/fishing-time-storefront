"use client"

import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "../../../../lib/util/cn"
import CategoriesNavigationMenu from "./categories-navigation-menu"
import CartSheet from "../../components/cart-sheet"
import MobileMenu from "../../../mobile-menu"
import { InternalLink } from "../../../common/components/internal-link"
import CountryMenu from "./select-country"
import Image from "next/image"
import { Input } from "../../../common/components/input"
import { Button } from "../../../common/components/button"
import { Search as SearchIcon } from "lucide-react"

const Nav = () => {
  const pathname = usePathname()
  const [isHome, setIsHome] = useState(true)
  const [isScrolled, setIsScrolled] = useState(false)

  //useEffect that detects if window is scrolled > 5px on the Y axis
  useEffect(() => {
    if (isHome) {
      const detectScrollY = () => {
        if (window.scrollY > 5) {
          setIsScrolled(true)
        } else {
          setIsScrolled(false)
        }
      }

      window.addEventListener("scroll", detectScrollY)

      return () => {
        window.removeEventListener("scroll", detectScrollY)
      }
    }
  }, [isHome])

  useEffect(() => {
    pathname === "/" ? setIsHome(true) : setIsHome(false)
  }, [pathname])

  const { toggle } = useMobileMenu()

  return (
    <div
      className={cn("sticky bg-white top-0 left-0 right-0 z-50 group", {
        "!fixed": isHome,
      })}
    >
      <header className="pb-2 pt-4 text-primary-950">
        <nav className="flex items-center flex-col justify-between w-full text-small-regular transition-colors duration-200 max-w-screen-large mx-auto gap-2">
          <div className="flex w-full items-center justify-between">
            <div className="sm:hidden flex-1 h-full flex items-center">
              <MobileMenu />
            </div>

            <div className="flex items-center justify-between w-full">
              {/* LOGO */}
              <Link href="/" className="text-xl-semi uppercase">
                <Image
                  alt="store logo"
                  width={340}
                  height={0}
                  src="/store-logo.svg"
                />
              </Link>
              {/* SEARCH */}
              <div className="flex justify-center w-full px-2 items-center">
                <Input
                  placeholder="Wyszukaj produkt"
                  type="search"
                  className="w-full max-w-lg"
                />
                <Button className="-ml-2 rounded-l-none gap-2 text-primary-500">
                  <SearchIcon className="w-4" />
                  Szukaj
                </Button>
              </div>
              {/* CART & OPTIONS */}
              <div className="flex items-center gap-x-2 h-full flex-1 basis-0 justify-end">
                <div className="hidden small:flex items-center gap-x-2 h-full">
                  {/* <DesktopSearchModal /> */}
                  <InternalLink variant="default" href="/account">
                    Konto
                  </InternalLink>
                </div>
                <CartSheet />
              </div>
            </div>
          </div>
          <div className="hidden sm:block">
            <CategoriesNavigationMenu />
          </div>
        </nav>
      </header>
    </div>
  )
}

export default Nav
