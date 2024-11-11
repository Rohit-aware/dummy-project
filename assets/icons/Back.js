import * as React from "react"
import Svg, { Path } from "react-native-svg"
import { Colors } from "../../src/constants"

function Back(props) {
    return (
        <Svg
            width={15.874}
            height={15.34}
            viewBox="0 0 15.874 15.34"
        >
            <Path
                fill={Colors.lightblue}
                data-name="Icon ionic-md-arrow-round-back"
                d="M14.498 6.191H4.845l3.744-3.669a1.556 1.556 0 000-2.089 1.312 1.312 0 00-1.949 0L.406 6.626A1.426 1.426 0 000 7.661v.018a1.426 1.426 0 00.406 1.035l6.23 6.192a1.312 1.312 0 001.949 0 1.556 1.556 0 000-2.089L4.841 9.148h9.653a1.431 1.431 0 001.381-1.478 1.416 1.416 0 00-1.377-1.479z"
            />
        </Svg>
    )
}

export default Back
