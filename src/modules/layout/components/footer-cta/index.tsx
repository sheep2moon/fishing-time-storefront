import UnderlineLink from "@modules/common/components/underline-link"
import Image from "next/image"

const FooterCTA = () => {
  return (
    <div className="bg-secondary-100 w-full">
      <div className="content-container flex flex-col-reverse gap-y-8 small:flex-row small:items-center justify-between py-16 relative">
        <div>
          <h3 className="text-2xl-semi">Załóż konto klienta</h3>
          <div className="mt-6">
            <UnderlineLink href="/">Przejdź do rejestracji</UnderlineLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default FooterCTA
