import React, { Component } from "react";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Header from "../../components/Header";
import { Icon } from "native-base";
import { courtHouseList } from "../../config/courts";
import { Pink } from "../../config/Theme";

export default class CourtList extends Component {
  state = {
    courts: [],
  };

  componentDidMount() {
    this.setState({
      courts: courtHouseList,
    });
  }

  search = (text) => {
    const keyword = text?.toLowerCase();
    const realData = courtHouseList;
    const finalData = realData.filter(
      (item) =>
        item.name?.toLowerCase()?.includes(keyword) ||
        item.address?.toLowerCase()?.includes(keyword)
    );

    this.setState({ courts: finalData });
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
              Which court is your ticket assigned to?
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

            {/* courts */}
            <ScrollView
              showsVerticalScrollIndicator={false}
              style={{ width: "100%" }}
            >
              {this.state.courts.map((item, i) => (
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("TicketImage")}
                  key={i}
                  style={{
                    width: "100%",
                    height: 70,
                    flexDirection: "row",
                    borderColor: "gainsboro",
                    borderStyle: "solid",
                    borderBottomWidth: 0.5,
                    justifyContent: "space-between",
                    paddingHorizontal: 0,
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <View>
                    <Text style={{ color: "black" }}>{item.name}</Text>
                    <Text style={{ color: Pink, marginTop: 5 }}>
                      {item.address}
                    </Text>
                  </View>
                  <Icon
                    name="arrow-forward-ios"
                    type="MaterialIcons"
                    style={{ fontSize: 15, color: "gray" }}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
