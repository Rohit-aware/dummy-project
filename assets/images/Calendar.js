import * as React from "react"
import Svg, { Path } from "react-native-svg"

function Calendar(props) {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={26.174}
      height={26.487}
      viewBox="0 0 26.174 26.487"
      {...props}
    >
      <Path
        data-name="Icon awesome-calendar-day"
        d="M0 24a2.659 2.659 0 002.8 2.483h20.57A2.659 2.659 0 0026.174 24V9.933H0zm3.739-9.933a.889.889 0 01.935-.828h5.609a.889.889 0 01.935.828v4.966a.889.889 0 01-.935.828H4.674a.889.889 0 01-.935-.828zM23.37 3.311h-2.8V.828A.889.889 0 0019.631 0h-1.87a.889.889 0 00-.935.828v2.483H9.348V.828A.889.889 0 008.413 0H6.544a.889.889 0 00-.935.828v2.483H2.8A2.659 2.659 0 000 5.794v2.483h26.174V5.794a2.659 2.659 0 00-2.804-2.483z"
        fill="#2c3d63"
      />
    </Svg>
  )
}

export default Calendar