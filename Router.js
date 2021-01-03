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
import TicketLawyer from "./src/Screens/Main/TicketLawyer";
import TicketImage from "./src/Screens/Main/TicketImage";
import NumberOfViolations from "./src/Screens/Main/NumberOfViolations";
import MoreTicketDetails from "./src/Screens/Main/MoreTicketDetails";
import CourtList from "./src/Screens/Main/CourtList";
import Profile from "./src/Screens/Main/Settings/Profile";
import PaymentMethods from "./src/Screens/Main/Settings/PaymentMethods";
import Contact from "./src/Screens/Main/Settings/Contact";
import Checkout from "./src/Screens/Main/Checkout";
import "./src/config/firebase";

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
    <Stack.Screen name="TicketImage" component={TicketImage} />
    <Stack.Screen name="NumberOfViolations" component={NumberOfViolations} />
    <Stack.Screen name="MoreTicketDetails" component={MoreTicketDetails} />
    <Stack.Screen name="CourtList" component={CourtList} />
    <Stack.Screen name="Lawyers" component={TicketLawyer} />
    <Stack.Screen name="Checkout" component={Checkout} />
    {/* settings screens */}
    <Stack.Screen name="Profile" component={Profile} />
    <Stack.Screen name="PaymentMethods" component={PaymentMethods} />
    <Stack.Screen name="Contact" component={Contact} />
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
