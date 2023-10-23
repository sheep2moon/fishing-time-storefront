import Providers from "@modules/providers"
import "styles/globals.css"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="">
        <Providers>
          <main className="">{children}</main>
        </Providers>
      </body>
    </html>
  )
}
