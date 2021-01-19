import { Icon } from "native-base";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import Header from "../../components/Header";
import { mapStateToProps, ToastError } from "../../config/config";
import { LightGray, Pink } from "../../config/Theme";
import * as f from "firebase";
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";
import { color } from "react-native-reanimated";
import { getLawyers, setLawyer } from "../../redux/actions/HomeActions";
import { WebView } from "react-native-webview";

class LawyerProfile extends Component {
  state = {
    lawyer: {},
    isPrice: false,
  };

  componentDidMount() {
    const lawyer = this.props.route.params.Lawyer;
    const isPrice = this.props.route.params.isPrice;

    this.setState({ lawyer, isPrice });
  }

  shadow = {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 4,
  };

  continue = () => {
    this.props.setLawyer(this.state.lawyer);
    this.props.navigation.navigate("Checkout");
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: LightGray,
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Header navigation={this.props.navigation} />

        <ScrollView style={{ width: "100%", backgroundColor: LightGray }}>
          <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
            <View style={{ width: "95%", flex: 1, alignItems: "center" }}>
              <View style={{ width: "100%", marginTop: 20 }}>
                <Image
                  style={{ width: "100%", height: 60 }}
                  source={require("../../../assets/lawyer-background.jpg")}
                />

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: 20,
                    padding: 10,
                    alignItems: "center",
                    ...this.shadow,
                  }}
                >
                  <Text
                    style={{
                      color: Pink,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    {this.state.lawyer?.name}
                  </Text>
                  <Text style={{ marginTop: 20 }}>
                    {this.state.lawyer?.state}
                  </Text>

                  <View style={{ width: "100%", marginTop: 20 }}>
                    <Image
                      style={{ width: "100%", height: 200 }}
                      source={{ uri: this.state.lawyer?.image }}
                    />
                  </View>
                </View>

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: 30,
                    padding: 10,
                    alignItems: "center",
                    ...this.shadow,
                  }}
                >
                  <Text
                    style={{
                      color: Pink,
                      fontSize: 20,
                      fontWeight: "bold",
                      width: "100%",
                    }}
                  >
                    Attorney Description
                  </Text>
                  <Text style={{ marginTop: 10 }}>
                    {this.state.lawyer?.description}
                  </Text>
                </View>

                {this.state.isPrice ? (
                  <TouchableOpacity
                    onPress={() => this.continue()}
                    style={{
                      width: "100%",
                      padding: 15,
                      borderRadius: 10,
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: Pink,
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontWeight: "bold",
                        fontSize: 20,
                      }}
                    >
                      Fight ticket for ${this.state.lawyer?.price}
                    </Text>
                  </TouchableOpacity>
                ) : null}

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "white",
                    marginTop: 30,
                    padding: 10,
                    alignItems: "center",
                    ...this.shadow,
                    marginBottom: 20,
                  }}
                >
                  <View style={{ width: "100%", flexDirection: "row" }}>
                    <Icon
                      name="shield-alt"
                      type="FontAwesome5"
                      style={{ color: Pink, fontSize: 50 }}
                    />
                    <View style={{ flex: 1, marginLeft: 15 }}>
                      <Text
                        style={{
                          fontSize: 18,
                          fontWeight: "bold",
                          color: "black",
                        }}
                      >
                        100% Secure Money-Back Guaranteed
                      </Text>
                      <Text style={{ marginTop: 10, fontSize: 15 }}>
                        If your attorney cannot dismiss or amend your ticket,
                        reduce points, or obtain you a plea bargain, you are
                        eligible for a full refund.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, { setLawyer })(LawyerProfile);
