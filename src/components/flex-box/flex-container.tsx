import type { BoxProps } from "@mui/material/Box"
import type { ReactNode } from "react"

import Box from "@mui/material/Box"

export type FlexContainerProps = {
    children: ReactNode
    flexDirection?: BoxProps["flexDirection"]
    stackOn?: "desktop" | "mobile" | "tablet"
} & BoxProps

export default function FlexContainer(props: FlexContainerProps) {
    const { alignItems, children, flexDirection = "row", justifyContent, stackOn, ...restOfProps } = props

    // Y-Axis should be centered by default, but X-Axis should be modified manually
    const localAlignItems = flexDirection === "column" || flexDirection === "column-reverse" ? "center" : "initial"
    const localJustifyContent = flexDirection === "row" || flexDirection === "row-reverse" ? "initial" : "center"

    // allow you to customize when the elements should be stacked
    const responsiveFlexDirection = stackOn ? getStackPreference(stackOn) : flexDirection

    return (
        <Box
            alignItems={alignItems || localAlignItems}
            display="flex"
            flexDirection={responsiveFlexDirection as BoxProps["flexDirection"]}
            gap={2}
            justifyContent={justifyContent || localJustifyContent}
            my={1}
            {...restOfProps}
        >
            {children}
        </Box>
    )
}

const getStackPreference = (stackOn: FlexContainerProps["stackOn"]) => {
    const stackPreferences = {
        desktop: { lg: "row", xs: "column" },
        mobile: { sm: "row", xs: "column" },
        tablet: { md: "row", xs: "column" },
    }

    // if the stackOn prop is not provided, return the default stack preference
    if (!stackOn) return stackPreferences.mobile
    return stackPreferences[stackOn]
}
