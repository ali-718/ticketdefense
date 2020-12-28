import React, { Component } from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Splash from "./src/Screens/Auth/Splash";
import Onboard from "./src/Screens/Auth/Onboard";
import Login from "./src/Screens/Auth/Login";
import Home from "./src/Screens/Main/Home";
import { connect } from "react-redux";
import { mapStateToProps } from "./src/config/config";
import StateList from "./src/Screens/Main/StateList";

const Stack = createStackNavigator();

const Auth = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="splash" component={Splash} />
    <Stack.Screen name="onBoard" component={Onboard} />
    <Stack.Screen name="login" component={Login} />
  </Stack.Navigator>
);

const Main = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={Home} />
    <Stack.Screen name="States" component={StateList} />
  </Stack.Navigator>
);

class Router extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {this.props.auth?.user?.id ? (
            <Stack.Screen name="Main" component={Main} />
          ) : (
            <Stack.Screen name="Auth" component={Auth} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default connect(mapStateToProps)(Router);
