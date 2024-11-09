import * as React from "react"
import Svg, { Path } from "react-native-svg"

function FileIcon(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={18.892}
      height={22}
      viewBox="0 0 18.892 22"
      {...props}
    >
      <Path
        d="M11.335 0H2.361A2.249 2.249 0 000 2.115v17.77A2.249 2.249 0 002.361 22H16.53a2.249 2.249 0 002.361-2.115V6.769zm-.945 7.615V1.692l6.612 5.923z"
        fill="#de564b"
      />
    </Svg>
  )
}

export default FileIcon
