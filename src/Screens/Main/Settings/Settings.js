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
  ScrollView,
} from "react-native";
import { Pink } from "../../../config/Theme";

export default class Settings extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          //   paddingTop: StatusBar.currentHeight,
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "90%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
              Settings
            </Text>
          </View>
        </View>

        <View style={{ marginTop: 10 }} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Profile")}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              borderColor: "gainsboro",
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "black" }}>Account</Text>

            <Icon
              name="arrow-forward-ios"
              type="MaterialIcons"
              style={{ fontSize: 15, color: "gray" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("PaymentMethods")}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              borderColor: "gainsboro",
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "black" }}>Payment methods</Text>

            <Icon
              name="arrow-forward-ios"
              type="MaterialIcons"
              style={{ fontSize: 15, color: "gray" }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("Contact")}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              borderColor: "gainsboro",
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "black" }}>Contact us</Text>

            <Icon
              name="arrow-forward-ios"
              type="MaterialIcons"
              style={{ fontSize: 15, color: "gray" }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => this.props.navigation.navigate("TicketImage")}
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              borderColor: "gainsboro",
              borderStyle: "solid",
              borderBottomWidth: 0.5,
              justifyContent: "space-between",
              paddingHorizontal: 20,
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <Text style={{ color: "red" }}>Logout</Text>

            <Icon
              name="arrow-forward-ios"
              type="MaterialIcons"
              style={{ fontSize: 15, color: "gray" }}
            />
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
