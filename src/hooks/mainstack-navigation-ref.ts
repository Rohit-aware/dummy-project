import { NavigationContainerRef } from "@react-navigation/native";
import { createRef } from "react";
import { MainStackProps } from "../router/interface";


const MainStackNavigatorRef = createRef<NavigationContainerRef<MainStackProps>>()


export { MainStackNavigatorRef }