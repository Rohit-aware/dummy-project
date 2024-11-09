import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Share(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26}
      height={25}
      viewBox="0 0 26 25"
      {...props}
    >
      <Path
        data-name="Icon awesome-share-alt-square"
        d="M26 2.679v19.642A2.734 2.734 0 0123.214 25H2.786A2.734 2.734 0 010 22.321V2.679A2.734 2.734 0 012.786 0h20.428A2.734 2.734 0 0126 2.679zm-8.357 12.053a3.311 3.311 0 00-2.193.819l-3.944-2.275a3.027 3.027 0 000-1.551L15.45 9.45a3.311 3.311 0 002.193.819 3.189 3.189 0 003.25-3.125 3.253 3.253 0 00-6.5 0 3.017 3.017 0 00.1.776l-3.943 2.274a3.31 3.31 0 00-2.193-.819 3.127 3.127 0 100 6.25 3.311 3.311 0 002.193-.819l3.944 2.275a3.016 3.016 0 00-.1.775 3.253 3.253 0 103.25-3.125z"
        fill="#033269"
      />
    </Svg>
  )
}

export default Share
