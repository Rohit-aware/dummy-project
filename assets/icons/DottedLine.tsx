import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function DottedLine({ height }: { height?: number }) {
    return (
        <Svg
            width={6}
            height={1000}
            viewBox={`0 0 6 1000`}
        >
            <G data-name="Group 100">
                <Path
                    data-name="Line 46"
                    fill="none"
                    stroke="#e4e4e4"
                    strokeWidth={5}
                    strokeDasharray={5}
                    d={`M2.5.016l1 1000`}
                />
            </G>
        </Svg>
    )
}

export default DottedLine
