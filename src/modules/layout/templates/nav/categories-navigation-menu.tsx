import { useProductCategories } from "medusa-react"
import React, { useEffect } from "react"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../common/components/navigation-menu"
import Link, { LinkProps } from "next/link"
import { cn } from "../../../../lib/util/cn"
import { ChevronRight, DotIcon } from "lucide-react"
import { InternalLink } from "../../../common/components/internal-link"

const CategoriesNavigationMenu = () => {
  const { product_categories } = useProductCategories()

  return (
    <div className="w-full justify-center flex items-center gap-1">
      <InternalLink variant="default" href={"/store"}>
        Sklep
      </InternalLink>
      <NavigationMenu>
        <NavigationMenuList>
          {product_categories?.map((category) => {
            if (category.parent_category) {
              return
            }

            return (
              <NavigationMenuItem key={category.id}>
                <NavigationMenuTrigger key={category.id}>
                  {category.name}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[400px] gap-1 p-2 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                    {category.category_children &&
                      category.category_children.map((firstChild) => {
                        const childCategories = product_categories.filter(
                          (c) => c.parent_category_id === firstChild.id
                        )

                        return (
                          <li key={firstChild.id} className="">
                            <ListItem
                              title={firstChild.name}
                              href={`/store?kategoria=${firstChild.handle}`}
                            />
                            {childCategories?.length > 0 && (
                              <div className="ml-4 border-l border-primary-500/20">
                                {childCategories.map((secondChild) => {
                                  return (
                                    <Link
                                      href={`/store?kategoria=${secondChild.handle}`}
                                      key={secondChild.id}
                                      className="p-1 pl-2 transition-colors hover:bg-primary-200 hover:text-secondary-900 focus:bg-primary-200 focus:text-secondary-900 flex items-center"
                                    >
                                      {/* <DotIcon className="h-6 w-6 p-0" /> */}
                                      {secondChild.name}
                                    </Link>
                                  )
                                })}
                              </div>
                            )}
                          </li>
                        )
                      })}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            )
          })}
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  )
}

export default CategoriesNavigationMenu

type ListItemProps = LinkProps & {
  title: string
  href: string
}

const ListItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & ListItemProps
>(({ href, title, ...props }, ref) => {
  return (
    <div className={cn("w-full", props.className)} {...props} ref={ref}>
      <NavigationMenuLink asChild>
        <Link
          href={href}
          className="w-full flex items-center gap-2 space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors text-sm hover:bg-primary-200 hover:text-secondary-900 focus:bg-primary-200 focus:text-secondary-900 font-semibold"
        >
          {title}
        </Link>
      </NavigationMenuLink>
    </div>
  )
})

ListItem.displayName = "ListItem"
