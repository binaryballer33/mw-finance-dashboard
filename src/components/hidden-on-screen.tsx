import type { ElementType, ReactNode } from "react"

import { Box, Typography } from "@mui/material"

type HiddenOnScreenProps = {
    children?: ReactNode
    component?: ElementType
    size: "lg" | "md" | "sm" | "xl" | "xs"
    sizeToShow: "lg" | "md" | "sm" | "xl" | "xs"
    sizeToShowDisplayType?: "block" | "inline"
    title?: string
} & (
    | { children: ReactNode } // Ensure that at least one of title or children is provided
    | { title: string } // Ensure that at least one of title or children is provided
)

/*
 * Hides the element is the screen size is smaller than the prop size
 * Doing it this way helps up with the responsive layout and bypass using useTheme useMediaQuery
 * Therefore not being the reason the component has to be converted to a client component
 */
export default function HiddenOnScreen(props: HiddenOnScreenProps) {
    const { children, component = "span", size, sizeToShow, sizeToShowDisplayType = "inline", title } = props

    return title ? (
        // If title is provided, render a typography as a span component
        <Typography
            component="span"
            sx={{
                display: {
                    [size]: "none",
                    [sizeToShow]: sizeToShowDisplayType,
                },
            }}
        >
            {title}
        </Typography>
    ) : (
        // If title is not provided, render the children
        <Box
            component={component}
            sx={{
                display: { [size]: "none", [sizeToShow]: sizeToShowDisplayType }, // Only show on small screens and up
            }}
        >
            {children}
        </Box>
    )
}
