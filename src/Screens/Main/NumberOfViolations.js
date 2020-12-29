import { Icon } from "native-base";
import React, { Component } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { Pink } from "../../config/Theme";

export default class NumberOfViolations extends Component {
  state = {
    violations: 1,
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
          alignItems: "center",
        }}
      >
        <Header navigation={this.props.navigation} />

        <View
          style={{
            width: "90%",
            flex: 1,
            alignItems: "center",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              How many violations did you recieve?
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                color: "gray",
                // textAlign: "center",
                width: "100%",
              }}
            >
              You can find your violation(s) listed on your ticket
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 40,
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    violations:
                      this.state.violations == 1
                        ? this.state.violations
                        : this.state.violations - 1,
                  })
                }
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                  borderStyle: "solid",
                  borderWidth: 0.5,
                  borderColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Icon style={{ fontSize: 20 }} name="minus" type="AntDesign" />
              </TouchableOpacity>

              <Text
                style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
              >
                {this.state.violations}
              </Text>

              <TouchableOpacity
                onPress={() =>
                  this.setState({
                    violations: this.state.violations + 1,
                  })
                }
                style={{
                  width: 45,
                  height: 45,
                  borderRadius: 100,
                  // borderStyle: "solid",
                  // borderWidth: 0.5,
                  // borderColor: "black",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Pink,
                }}
              >
                <Icon
                  style={{ color: "white", fontSize: 20 }}
                  name="plus"
                  type="AntDesign"
                />
              </TouchableOpacity>
            </View>
          </View>

          <View
            style={{ width: "100%", marginBottom: 20, alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("MoreTicketDetails")
              }
              style={{
                width: "100%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Pink,
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
              >
                Continue
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
