import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Filter(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={28.493}
      height={25.908}
      viewBox="0 0 28.493 25.908"
      {...props}
    >
      <Path
        d="M27.156 0H1.337a1.205 1.205 0 00-.944 2.073l10.292 9.36V21.86a1.186 1.186 0 00.57.995l4.452 2.833a1.348 1.348 0 002.1-.995v-13.26L28.1 2.073A1.205 1.205 0 0027.156 0z"
        fill="#033269"
      />
    </Svg>
  )
}

export default Filter
