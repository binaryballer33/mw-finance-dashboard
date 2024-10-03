import type { Metadata } from "next"
import type { ReactNode } from "react"

import { Reddit_Mono } from "next/font/google"

import ProvidersLayout from "src/layouts/providers-layout"

// const roboto = Roboto({ subsets: ["latin"], weight: "400" })
// const robotoMono = Roboto_Mono({ subsets: ["latin"] })
const redditMono = Reddit_Mono({ subsets: ["latin"], weight: "400" })

export const metadata: Metadata = {
    description: "Practicing Working With Trade Data",
    title: "MW - Finance Dashboard",
}

type RootLayoutProps = {
    children: ReactNode
}

export default function RootLayout(props: Readonly<RootLayoutProps>) {
    const { children } = props

    return (
        <html lang="en">
            <body className={redditMono.className}>
                <ProvidersLayout>{children}</ProvidersLayout>
            </body>
        </html>
    )
}
