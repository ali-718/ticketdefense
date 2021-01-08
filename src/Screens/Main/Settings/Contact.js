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
import call from "react-native-phone-call";
import * as MailComposer from "expo-mail-composer";

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
            placeholder={`Enter your message here`}
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

          <View style={{ width: "100%", marginTop: 30 }}>
            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>
              Email us
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ width: 40 }}>
                <Icon
                  name="mail"
                  type="Entypo"
                  style={{ color: "gray", fontSize: 20 }}
                />
              </View>
              <TouchableOpacity
                onPress={() =>
                  MailComposer.composeAsync({
                    recipients: ["alimurtuza718@gmail.com"],
                  })
                }
              >
                <Text style={{ color: Pink, textDecorationLine: "underline" }}>
                  alimurtuza718@gmail.com
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={{ width: "100%", marginTop: 30 }}>
            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>
              Call us
            </Text>
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                alignItems: "center",
                marginTop: 10,
              }}
            >
              <View style={{ width: 40 }}>
                <Icon
                  name="phone"
                  type="Entypo"
                  style={{ color: "gray", fontSize: 20 }}
                />
              </View>
              <TouchableOpacity onPress={() => call("+92 3062888544")}>
                <Text style={{ color: Pink, textDecorationLine: "underline" }}>
                  +92 3062888544
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
