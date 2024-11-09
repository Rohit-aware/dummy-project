import * as React from "react";
import { Dimensions } from "react-native";
import Svg, { Mask, Rect, Path, SvgProps } from "react-native-svg";
import { moderateScale } from "../../src/constants";
const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('screen')
const BottomBack = (props: SvgProps) => (
    <Svg
        width={SCREEN_WIDTH}
        height={moderateScale(100)}
        viewBox="0 0 362 94"
        fill="none"
        {...props}
    >
        <Mask
            id="path-1-outside-1_1415_1240"
            maskUnits="userSpaceOnUse"
            x={0}
            y={0}
            width={362}
            height={94}
            fill="black"
        >
            <Rect fill="#F5F5F5" width={362} height={94} />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M181 40C197.009 40 210.764 30.3547 216.773 16.5585C220.301 8.45696 227.163 1 236 1H345C353.837 1 361 8.16344 361 17V77C361 85.8366 353.837 93 345 93H17C8.16344 93 1 85.8366 1 77V17C1 8.16345 8.16344 1 17 1H126C134.837 1 141.699 8.45696 145.227 16.5585C151.236 30.3547 164.991 40 181 40Z"
            />
        </Mask>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M181 40C197.009 40 210.764 30.3547 216.773 16.5585C220.301 8.45696 227.163 1 236 1H345C353.837 1 361 8.16344 361 17V77C361 85.8366 353.837 93 345 93H17C8.16344 93 1 85.8366 1 77V17C1 8.16345 8.16344 1 17 1H126C134.837 1 141.699 8.45696 145.227 16.5585C151.236 30.3547 164.991 40 181 40Z"
            fill="#fff"
        />
        <Path
            d="M145.227 16.5585L144.31 16.9578L145.227 16.5585ZM216.773 16.5585L217.69 16.9578L216.773 16.5585ZM215.856 16.1592C210.001 29.6037 196.597 39 181 39V41C197.421 41 211.528 31.1057 217.69 16.9578L215.856 16.1592ZM236 2H345V0H236V2ZM360 17V77H362V17H360ZM345 92H17V94H345V92ZM2 77V17H0V77H2ZM17 2H126V0H17V2ZM181 39C165.403 39 151.999 29.6037 146.144 16.1592L144.31 16.9578C150.472 31.1057 164.579 41 181 41V39ZM126 2C134.236 2 140.84 8.99025 144.31 16.9578L146.144 16.1592C142.557 7.92366 135.437 0 126 0V2ZM17 92C8.71573 92 2 85.2843 2 77H0C0 86.3888 7.61116 94 17 94V92ZM360 77C360 85.2843 353.284 92 345 92V94C354.389 94 362 86.3888 362 77H360ZM345 2C353.284 2 360 8.71573 360 17H362C362 7.61116 354.389 0 345 0V2ZM2 17C2 8.71573 8.71573 2 17 2V0C7.61116 0 0 7.61116 0 17H2ZM217.69 16.9578C221.16 8.99025 227.764 2 236 2V0C226.563 0 219.443 7.92366 215.856 16.1592L217.69 16.9578Z"
            fill="#2B2B2B"
            // fill="#F5F5F5"
            fillOpacity={0.05}
            mask="url(#path-1-outside-1_1415_1240)"
        />
    </Svg>
);
export default BottomBack;
