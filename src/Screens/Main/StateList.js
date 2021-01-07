import { Icon } from "native-base";
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
import { connect } from "react-redux";
import Header from "../../components/Header";
import { mapStateToProps } from "../../config/config";
import { stateList } from "../../config/states";
import { setUSState } from "../../redux/actions/HomeActions";

class StateList extends Component {
  state = {
    states: [],
  };

  componentDidMount() {
    this.setState({
      states: stateList,
    });
  }

  search = (text) => {
    const keyword = text?.toLowerCase();
    const realData = stateList;
    const finalData = realData.filter((item) =>
      item.text?.toLowerCase()?.includes(keyword)
    );

    this.setState({ states: finalData });
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
              Where did you get your ticket ?
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
              style={{ width: "100%" }}
            >
              {this.state.states.map((item, i) => (
                <TouchableOpacity
                  onPress={() => {
                    this.props.setUSState(item.text);
                    this.props.navigation.navigate("MoreTicketDetails");
                  }}
                  key={i}
                  style={{
                    width: "100%",
                    height: 50,
                    flexDirection: "row",
                    borderColor: "gainsboro",
                    borderStyle: "solid",
                    borderBottomWidth: 0.5,
                    justifyContent: "space-between",
                    paddingHorizontal: 10,
                    alignItems: "center",
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "black" }}>{item.text}</Text>

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

export default connect(mapStateToProps, { setUSState })(StateList);
