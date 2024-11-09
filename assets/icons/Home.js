import * as React from "react"
import Svg, { G, Path } from "react-native-svg"

function Home({ color }) {
  return (
    <Svg
      data-name="Icons / Navigation icon (12 states)"
      width={24.146}
      height={22.701}
      viewBox="0 0 24.146 22.701"
    >
      <G fill="none">
        <Path data-name="Path 372" d="M0 0h24.146v22.7H0z" />
        <Path
          data-name="Path 373"
          d="M5.03 11.351H3.018l9.055-8.513 9.055 8.513h-2.01"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        />
        <Path
          data-name="Path 374"
          d="M5.03 11.35v6.621a1.955 1.955 0 002.012 1.892h10.061a1.955 1.955 0 002.012-1.892V11.35"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        />
        <Path
          data-name="Path 375"
          d="M9.055 16.971v-5.675a1.955 1.955 0 012.012-1.892h2.012a1.955 1.955 0 012.012 1.892v5.675"
          stroke={color}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.8}
        />
      </G>
    </Svg>
  )
}

export default Home
