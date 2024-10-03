"use client"

import type { ReactNode } from "react"

import { responsiveFontSizes } from "@mui/material"
import CssBaseline from "@mui/material/CssBaseline"
import { createTheme, ThemeProvider as MuiThemeProvider } from "@mui/material/styles"

const theme = responsiveFontSizes(
    createTheme({
        palette: {
            mode: "dark",
        },
        typography: {
            fontFamily: "inherit", // Inherit from global styles
        },
    }),
)

export default function ThemeProvider({ children }: { children: ReactNode }) {
    return (
        <MuiThemeProvider theme={theme}>
            <CssBaseline />
            {children}
        </MuiThemeProvider>
    )
}
