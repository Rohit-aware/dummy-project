import React from "react";
import { MainStackProps } from "../router/interface";
import { NavigationContainerRef } from "@react-navigation/native";


const MainStackNavigatorRef = React.createRef<NavigationContainerRef<MainStackProps>>()
export { MainStackNavigatorRef }