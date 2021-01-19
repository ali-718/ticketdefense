import React, { Component } from "react";
import { Image, Text, View } from "react-native";
import * as SplashScreen from "expo-splash-screen";
import { connect } from "react-redux";
import { mapStateToProps } from "../../config/config";
import { fetchUser } from "../../redux/actions/AuthActions";
import * as Animatable from "react-native-animatable";
import { Pink } from "../../config/Theme";
import * as f from "firebase";
import { getLawyers } from "../../redux/actions/HomeActions";
import * as Notifications from "expo-notifications";
import { lawyers } from "../../config/Lawyers";

class Splash extends Component {
  async componentDidMount() {
    // lawyers.map((item) => {
    //   f.default.database().ref("lawyers").push(item);
    // });
    setTimeout(() => {
      this.props
        .fetchUser()
        .then(() => {
          SplashScreen.hideAsync();
        })
        .catch(() => {
          SplashScreen.hideAsync();
          this.props.navigation.navigate("onBoard");
        });
    }, 1000);
  }

  render() {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: Pink,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Animatable.Image
          duration={1000}
          animation="bounceIn"
          style={{ width: 450, height: 150, resizeMode: "contain" }}
          source={require("../../../assets/logo.png")}
        />
      </View>
    );
  }
}

export default connect(mapStateToProps, { fetchUser, getLawyers })(Splash);
