import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Bar(props) {
  return (
    <Svg
      width={23.506}
      height={16.267}
      viewBox="0 0 23.506 16.267"
    >
      <G data-name="Group 94">
        <G
          data-name="Group 74"
          fill="none"
          stroke="#fcfcfc"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeMiterlimit={10}
          strokeWidth={2}
        >
          <Path data-name="Line 1" d="M1 8.058h10.499" />
          <G data-name="Group 73">
            <Path data-name="Line 2" d="M1 1h21.506" />
            <Path data-name="Line 3" d="M1 15.267h6.333" />
          </G>
        </G>
      </G>
    </Svg>
  )
}

export default Bar
