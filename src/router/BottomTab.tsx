import React from "react";
import BottomComp from "./components/BottomComp";
import { Home, MyProfile, MyProjects, MyLeads } from "../screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tabs = createBottomTabNavigator();
const Empty: React.FC = () => null;
interface BottomTabProps { }

const BottomTab: React.FC<BottomTabProps> = () => {


    const renderTab = (name: string, component: React.ComponentType, condition: boolean) => {
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
            {renderTab("Dashboard", Home, true)}
            {renderTab("MyLeads", MyLeads, true)}
            {renderTab("Empty", Empty, true)}
            {renderTab("MyProjects", MyProjects, true)}
            {renderTab("MyProfile", MyProfile, true)}
        </Tabs.Navigator>
    );
};

export default BottomTab;
