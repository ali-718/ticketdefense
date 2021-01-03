import { Icon } from "native-base";
import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { Lawyers } from "../../config/Lawyers";
import { Pink } from "../../config/Theme";

export default class TicketLawyer extends Component {
  state = {
    lawyers: [],
  };

  componentDidMount() {
    this.setState({
      lawyers: Lawyers,
    });
  }

  search = (text) => {
    const keyword = text?.toLowerCase();
    const realData = Lawyers;
    const finalData = realData.filter((item) =>
      item.name?.toLowerCase()?.includes(keyword)
    );

    this.setState({ lawyers: finalData });
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
        }}
      >
        <Header navigation={this.props.navigation} />
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "90%", flex: 1, alignItems: "center" }}>
            {/* <View style={{ width: "100%" }}> */}
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Popular Traffic Ticket Lawyer ?
            </Text>
            {/* </View> */}

            <View style={{ width: "100%", marginTop: 20 }}>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderWidth: 0.5,
                  borderColor: "gray",
                  borderRadius: 10,
                  borderStyle: "solid",
                  height: 50,
                  alignItems: "center",
                  paddingHorizontal: 10,
                  backgroundColor: "#F8F8F8",
                  overflow: "hidden",
                }}
              >
                <Icon name="search" type="EvilIcons" style={{ fontSize: 25 }} />

                <TextInput
                  onChangeText={(val) => this.search(val)}
                  placeholder="Search"
                  style={{ marginLeft: 10, flex: 1 }}
                  placeholderTextColor="gray"
                />
              </View>
            </View>

            {/* states */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%", paddingBottom: 20 }}
            >
              {this.state.lawyers.map((item, i) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("Checkout")}
                  key={i}
                  style={{
                    width: "100%",
                    // height: 50,
                    flexDirection: "row",
                    borderColor: "gainsboro",
                    borderStyle: "solid",
                    borderBottomWidth: 0.5,
                    justifyContent: "space-between",

                    alignItems: "center",
                    marginTop: 20,
                    paddingBottom: 10,
                  }}
                >
                  <View
                    style={{
                      width: 70,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ width: 60, height: 60, borderRadius: 100 }}
                      source={{ uri: item.image }}
                    />
                  </View>
                  <View style={{ flex: 1, marginLeft: 5 }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "black",
                        fontSize: 10,
                        fontWeight: "bold",
                      }}
                    >
                      {item.name}
                    </Text>
                    <Text
                      numberOfLines={3}
                      style={{ color: "gray", marginTop: 5, fontSize: 10 }}
                    >
                      {item.description}
                    </Text>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginTop: 10,
                      }}
                    >
                      <View
                        style={{ flexDirection: "row", alignItems: "center" }}
                      >
                        <Icon
                          name="star"
                          type="Entypo"
                          style={{ color: "#ffd700", fontSize: 15 }}
                        />
                        <Text style={{ color: "#ffd700", fontSize: 12 }}>
                          {" "}
                          0.0
                        </Text>
                        <Text style={{ color: "gray", fontSize: 12 }}>
                          {" "}
                          (0)
                        </Text>
                      </View>

                      <View style={{ alignItems: "center" }}>
                        <Text style={{ color: Pink, fontSize: 10 }}>
                          Total Rate
                        </Text>
                        <Text
                          style={{ color: Pink, marginTop: 1, fontSize: 12 }}
                        >
                          ${item.rate}
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
