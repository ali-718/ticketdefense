import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { connect } from "react-redux";
import { mapStateToProps } from "../../config/config";
import { fetchUser } from "../../redux/actions/AuthActions";

class Splash extends Component {
  componentDidMount() {
    SplashScreen.preventAutoHideAsync();
    this.props
      .fetchUser()
      .then(() => {
        SplashScreen.hideAsync();
      })
      .catch(() => {
        SplashScreen.hideAsync();

        this.props.navigation.navigate("onBoard");
      });
  }

  render() {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        <Image
          style={{ width: "100%", flex: 1, resizeMode: "cover" }}
          source={require("../../../assets/splash.png")}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, { fetchUser })(Splash);
