import * as React from "react"
import Svg, { Path } from "react-native-svg"
import Colors from "../../constants/color"

function DropDownIcon(props) {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={16.845}
            height={11.721}
            viewBox="0 0 16.845 11.721"
            {...props}
        >
            <Path

                data-name="Icon ionic-ios-arrow-back"
                d="M8.351 8.065L14.828.908a1.048 1.048 0 011.66.059 1.59 1.59 0 01-.069 1.973l-7.338 8.11a1.047 1.047 0 01-1.623-.017l-6.8-8.64A1.591 1.591 0 01.729.42a1.048 1.048 0 011.66.059z"
                fill={"#033269"}
            />
        </Svg>
    )
}

export default DropDownIcon