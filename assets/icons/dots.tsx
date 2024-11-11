import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Dots({ style }: { style?: any }) {
  return (
    <Svg
      width={"100%"}
      height={2}
      viewBox="0 0 398.003 2"
      style={[{ position: "absolute", bottom: 0 }, style]}
    >
      <Path
        data-name="Line 39"
        fill="none"
        stroke="#94969a"
        strokeDasharray={2}
        d="M.001.5l398 1"
      />
    </Svg>
  )
}

export default Dots