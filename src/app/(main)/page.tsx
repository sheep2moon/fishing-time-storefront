import FeaturedProducts from "@modules/home/components/latest-products"
import Hero from "@modules/home/components/hero"
import { Metadata } from "next"
import LatestProducts from "@modules/home/components/latest-products"

export const metadata: Metadata = {
  title: "Strona główna",
  description:
    "Sklep wędkarski Fishing Time. Szeroki wybór asortymentu wędkarskiego.",
}

const Home = () => {
  return (
    <div className="mt-16">
      {/* <Hero /> */}
      <LatestProducts />
    </div>
  )
}

export default Home
