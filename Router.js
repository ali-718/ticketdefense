import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./src/Screens/Splash";
import Onboard from "./src/Screens/Onboard";

const Stack = createStackNavigator();

const Auth = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="splash" component={Splash} />
    <Stack.Screen name="onBoard" component={Onboard} />
  </Stack.Navigator>
);

export default class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Auth" component={Auth} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
