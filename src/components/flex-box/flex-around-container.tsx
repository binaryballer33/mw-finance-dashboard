import type { FlexContainerProps } from "src/components/flex-box/flex-container"

import FlexContainer from "src/components/flex-box/flex-container"

export default function FlexAroundContainer(props: FlexContainerProps) {
    const { children, stackOn, ...restOfProps } = props

    return (
        <FlexContainer justifyContent="space-around" stackOn={stackOn} {...restOfProps}>
            {children}
        </FlexContainer>
    )
}
