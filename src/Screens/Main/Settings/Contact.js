import { Icon, Picker, Textarea } from "native-base";
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
  ImageBackground,
  TextInput,
} from "react-native";
import { LightGray, Pink } from "../../../config/Theme";
import Header from "../../../components/Header";

export default class Contact extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
          alignItems: "center",
          backgroundColor: LightGray,
        }}
      >
        <Header navigation={this.props.navigation} />
        <View
          style={{
            width: "90%",
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
              Contact Us
            </Text>
          </View>
        </View>

        <View style={{ width: "90%", flex: 1, marginTop: 20 }}>
          <Text
            style={{
              fontSize: 14,
              color: "black",
              fontWeight: "bold",
            }}
          >
            Send us a message
          </Text>
          <Textarea
            style={{
              width: "100%",
              borderRadius: 10,
              backgroundColor: "white",
              borderWidth: 0.5,
              marginTop: 10,
            }}
            placeholder="Enter your message here"
            rowSpan={5}
          />
          <TouchableOpacity
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
            <Text style={{ color: "white", fontWeight: "bold" }}>
              Send Message
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}
