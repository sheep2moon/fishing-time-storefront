import { useMobileMenu } from "@lib/context/mobile-menu-context"
import { useStore } from "@lib/context/store-context"
import useCountryOptions from "@lib/hooks/use-country-options"
import ChevronDown from "@modules/common/icons/chevron-down"
import X from "@modules/common/icons/x"
import ReactCountryFlag from "react-country-flag"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../common/components/dropdown-menu"
import { Button } from "../../../common/components/button"

const CountryMenu = () => {
  const { setRegion, countryCode } = useStore()
  const countryOptions = useCountryOptions()

  const handleSelectCountry = (regionId: string, countryCode: string) => {
    setRegion(regionId, countryCode)
    close()
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="default" className="h-full gap-2">
          {countryCode && (
            <ReactCountryFlag
              className="text-lg"
              svg
              countryCode={countryCode}
            />
          )}
          <span className="text-sm font-normal">Kraj wysyłki</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="py-2">
        <DropdownMenuLabel>Wysyłka do:</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <div className="flex flex-col gap-1">
          {countryOptions?.map((option) => (
            <Button
              className="justify-start gap-4"
              key={option.country}
              onClick={() => handleSelectCountry(option.region, option.country)}
            >
              <div className="flex items-center gap-x-4">
                <ReactCountryFlag svg countryCode={option.country} />
                <span className="text-base-regular">{option.label}</span>
              </div>
              <ChevronDown size={16} className="-rotate-90 ml-auto" />
            </Button>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default CountryMenu
