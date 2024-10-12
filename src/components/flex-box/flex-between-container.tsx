import type { FlexContainerProps } from "src/components/flex-box/flex-container"

import FlexContainer from "src/components/flex-box/flex-container"

export default function FlexBetweenContainer(props: FlexContainerProps) {
    const { children, stackOn, ...restOfProps } = props

    return (
        <FlexContainer justifyContent="space-between" stackOn={stackOn} {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
