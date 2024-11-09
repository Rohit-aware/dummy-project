import * as React from "react"
import Svg, { Defs, ClipPath, Circle, G, Path } from "react-native-svg"

function Plus(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={27}
      height={27}
      viewBox="0 0 27 27"
      {...props}
    >
      <G data-name="icon/content/add_24px">
        <Path fill="none" d="M0 0h27v27H0z" />
        <Path
          data-name="\u21B3Color"
          d="M22.321 14.555h-7.133v6.812H12.81v-6.812H5.677v-2.271h7.133V5.472h2.378v6.812h7.133z"
          fill="#fff"
        />
      </G>
    </Svg>
  )
}

export default Plus
