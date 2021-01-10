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
              <Text style={{ fontSize: 22, color: "black" }}>
                Your ticket from{" "}
                {moment(this.state.ticket?.date).format("MMMM D")}
              </Text>

              <View
                style={{
                  width: "100%",
                  backgroundColor: "rgb(242, 201, 223)",
                  padding: 15,
                  marginTop: 20,
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ width: 60, height: 60, borderRadius: 100 }}
                      source={{ uri: this.state.ticket?.lawyer?.image }}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "black",
                        fontSize: 13,
                        fontWeight: "bold",
                        width: "90%",
                      }}
                    >
                      Handling your case
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "black",
                        fontSize: 14,
                        width: "100%",
                        marginTop: 5,
                      }}
                    >
                      {this.state.ticket?.lawyer?.name}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  // onPress={() => this.setState({ existingCardModal: true })}
                  style={{
                    width: "100%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 10,
                    borderColor: Pink,
                    borderWidth: 1,
                    borderStyle: "solid",
                    marginTop: 20,
                  }}
                >
                  <Text
                    style={{ color: Pink, fontSize: 17, fontWeight: "bold" }}
                  >
                    Message Attorney
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}
