import * as React from "react"
import Svg, { Path, Circle } from "react-native-svg"

function Projects({color}) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={23.113}
      height={23.521}
      viewBox="0 0 23.113 23.521"
    >
      <Path data-name="Path 393" d="M0 0h23.113v23.521H0z" fill="none" />
      <Circle
        data-name="Ellipse 3"
        cx={4}
        cy={4}
        r={4}
        transform="translate(4.6 2.771)"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        data-name="Path 394"
        d="M2.889 20.581v-1.96a3.887 3.887 0 013.852-3.92h3.848a3.887 3.887 0 013.852 3.92v1.96"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        data-name="Path 395"
        d="M15.409 3.068a3.938 3.938 0 010 7.6"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
      <Path
        data-name="Path 396"
        d="M20.224 20.581v-1.96a3.908 3.908 0 00-2.889-3.773"
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  )
}

export default Projects
