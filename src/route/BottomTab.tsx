import React from "react";
import BottomComp from "./components/BottomComp";
import { Home, MyProfile, MyProjects, MyLeads } from "../screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useStartupStore } from "../store";

const Tabs = createBottomTabNavigator();
const Empty: React.FC = () => null;

const BottomTab = () => {
    const { data: { screens: { bottom_nav: { add_lead_icon, home, leads, profiles, projects } = {} } = {} } = {} } = useStartupStore() || {};

    const renderTab = (name: string, component: React.ComponentType, condition: boolean | undefined) => {
        return condition ? (
            <Tabs.Screen name={name} component={component} />
        ) : (
            <Tabs.Screen
                name={`Empty_${name}`}
                component={Empty}
                listeners={({ navigation }) => ({
                    tabPress: (e) => {
                        e.preventDefault();
                    },
                })}
            />
        );
    };

    return (
        <Tabs.Navigator
            tabBar={(props) => <BottomComp {...props} />}
            screenOptions={{ headerShown: false }}
        >
            {renderTab("Dashboard", Home, home)}
            {renderTab("MyLeads", MyLeads, leads)}
            {renderTab("Empty", Empty, add_lead_icon)}
            {renderTab("MyProjects", MyProjects, projects)}
            {renderTab("MyProfile", MyProfile, profiles)}
        </Tabs.Navigator>
    );
};

export default BottomTab;
