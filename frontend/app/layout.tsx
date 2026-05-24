import "@/styles/globals.css"

import { Toaster } from "sonner"

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">

      <body>

        {children}

        <Toaster
          position="top-right"
          richColors
          theme="light"
        />

      </body>

    </html>
  )
}