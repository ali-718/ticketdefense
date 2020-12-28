import React, { Component } from "react";
import { Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";

export default class Splash extends Component {
  componentDidMount() {
    // SplashScreen.preventAutoHideAsync();
    this.props.navigation.navigate("onBoard");
  }

  render() {
    return <View></View>;
  }
}
