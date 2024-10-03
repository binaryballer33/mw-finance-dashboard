import type { ReactNode } from "react"

import ReactQueryClientProvider from "src/layouts/query-client-provider"
import ThemeProvider from "src/layouts/theme-provider"

export default function ProvidersLayout({ children }: { children: ReactNode }) {
    return (
        <ThemeProvider>
            <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
        </ThemeProvider>
    )
}
