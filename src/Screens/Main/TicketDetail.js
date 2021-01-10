import React, { Component } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { Pink } from "../../config/Theme";
import { Container, Tab, Tabs, TabHeading, Icon } from "native-base";
import Settings from "./Settings/Settings";
import { connect } from "react-redux";
import { mapStateToProps } from "../../config/config";
import { getList } from "../../redux/actions/HomeActions";
import moment from "moment";
import Header from "../../components/Header";

export default class TicketDetail extends Component {
  state = {
    ticket: {},
  };

  componentDidMount() {
    const ticket = this.props.route.params.ticket;
    console.log(ticket);
    this.setState({ ticket });
  }

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Header noBack navigation={this.props.navigation} />
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              paddingVertical: 20,
              alignItems: "center",
            }}
          >
            <View style={{ width: "90%" }}>
              <Text
                style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
              >
                Your ticket from{" "}
              </Text>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
