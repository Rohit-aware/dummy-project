import * as React from "react"
import Svg, { Defs, LinearGradient, Stop, Path } from "react-native-svg"

function Fire(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={20.144}
      height={27.253}
      viewBox="0 0 20.144 27.253"
      {...props}
    >
      <Defs>
        <LinearGradient
          id="prefix__a"
          x1={0.5}
          x2={0.5}
          y2={1}
          gradientUnits="objectBoundingBox"
        >
          <Stop offset={0} stopColor="#f2ad13" />
          <Stop offset={1} stopColor="#eb5817" />
        </LinearGradient>
      </Defs>
      <Path
        d="M17.961 1a27.834 27.834 0 01.932 6.133c0 2.632-1.7 4.766-4.293 4.766a4.619 4.619 0 01-4.57-4.766l.038-.46A17.749 17.749 0 006 18.037a10.073 10.073 0 1020.144 0A21.985 21.985 0 0017.961 1zm-2.254 23.42a4.027 4.027 0 01-4.054-4.012 3.981 3.981 0 013.538-3.986 9.675 9.675 0 005.817-3.3 18.073 18.073 0 01.743 5.162 6.09 6.09 0 01-6.043 6.133z"
        transform="translate(-6 -1.005)"
        fill="url(#prefix__a)"
      />
    </Svg>
  )
}

export default Fire
