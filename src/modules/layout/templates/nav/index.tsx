"use client"

import { useMobileMenu } from "@lib/context/mobile-menu-context"
import Hamburger from "@modules/common/components/hamburger"
import CartDropdown from "@modules/layout/components/cart-dropdown"
import DropdownMenu from "@modules/layout/components/dropdown-menu"
import DesktopSearchModal from "@modules/search/templates/desktop-search-modal"
import clsx from "clsx"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "../../../../lib/util/cn"
import CategoriesNavigationMenu from "./categories-navigation-menu"
import CartSheet from "../../components/cart-sheet"
import MobileMenu from "../../../mobile-menu"
import { InternalLink } from "../../../common/components/internal-link"
import CountryMenu from "./select-country"

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
      className={clsx("sticky bg-primary top-0 left-0 right-0 z-50 group", {
        "!fixed": isHome,
      })}
    >
      <header
        className={cn(
          "relative py-2 px-2 sm:px-8 mx-auto max-w-screen-2xlarge transition-colors border-b border-transparent duration-200 group-hover:bg-white group-hover:border-gray-200 text-primary-950"
        )}
      >
        <nav
          className={cn(
            "flex items-center flex-col justify-between w-full text-small-regular transition-colors duration-200"
          )}
        >
          <div className="flex w-full items-center justify-between">
            <div className="flex-1 h-full flex items-center">
              <div className="sm:hidden">
                <MobileMenu />
              </div>
              <CountryMenu />
            </div>

            <div className="flex items-center h-full">
              <Link href="/" className="text-xl-semi uppercase">
                Fishing Time
              </Link>
            </div>

            <div className="flex items-center gap-x-2 h-full flex-1 basis-0 justify-end">
              <div className="hidden small:flex items-center gap-x-2 h-full">
                {process.env.FEATURE_SEARCH_ENABLED && <DesktopSearchModal />}
                <InternalLink variant="default" href="/account">
                  Konto
                </InternalLink>
              </div>
              <CartSheet />
            </div>
          </div>
          <CategoriesNavigationMenu />
        </nav>
      </header>
    </div>
  )
}

export default Nav
