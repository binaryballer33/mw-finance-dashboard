import type { FlexContainerProps } from "src/components/flex-box/flex-container"

import FlexContainer from "src/components/flex-box/flex-container"

export default function FlexCenterContainer(props: FlexContainerProps) {
    const { children, stackOn, ...restOfProps } = props

    return (
        <FlexContainer justifyContent="center" stackOn={stackOn} {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
