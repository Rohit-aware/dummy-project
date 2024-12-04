import React from "react";
import { MainStackProps } from "../route/interface";
import { NavigationContainerRef } from "@react-navigation/native";


const MainStackNavigatorRef = React.createRef<NavigationContainerRef<MainStackProps>>()
export { MainStackNavigatorRef }