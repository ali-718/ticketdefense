import React, { Component } from "react";
import {
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Pink } from "../../config/Theme";
import { Container, Header, Tab, Tabs, TabHeading, Icon } from "native-base";
import { stateList } from "../../config/states";
import Settings from "./Settings/Settings";

export default class Home extends Component {
  // componentDidMount() {
  //   const search = "f";
  //   let find = stateList.filter((item) => item?.text.includes(search));

  //   console.log(find);
  // }

  tab1 = () => (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <View
        style={{
          backgroundColor: "white",
          borderStyle: "solid",
          borderWidth: 3,
          borderColor: "green",
          borderRadius: 100,
          alignItems: "center",
          justifyContent: "center",
          width: 150,
          height: 150,
        }}
      >
        <Icon
          name="thumbs-o-up"
          type="FontAwesome"
          style={{ color: Pink, fontSize: 75 }}
        />
      </View>
      <Text style={{ fontWeight: "500", fontSize: 24, marginTop: 20 }}>
        Keep up the good driving!
      </Text>
      <Text
        style={{
          fontSize: 15,
          marginTop: 10,
          color: "gray",
          // textAlign: "center",
          width: "90%",
        }}
      >
        This is where you'll see the status of your active cases, and manage
        each case from start to finish
      </Text>
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("States")}
        style={{
          width: "90%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Pink,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 17 }}>Fight a new ticket</Text>
      </TouchableOpacity>
    </View>
  );

  tab2 = () => (
    <View
      style={{
        width: "100%",
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <TouchableOpacity
        onPress={() => this.props.navigation.navigate("States")}
        style={{
          width: "90%",
          height: 50,
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: Pink,
          borderRadius: 10,
          marginTop: 20,
        }}
      >
        <Text style={{ color: "white", fontSize: 17 }}>Fight a new ticket</Text>
      </TouchableOpacity>
    </View>
  );

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
        <Tabs
          locked
          onChangeTab={(val) => {
            if (val.i == 1) {
              this.props.navigation.navigate("States");
            }
          }}
          style={{
            borderBottomWidth: 0,
          }}
          tabBarActiveTextColor="white"
          tabBarPosition="bottom"
          tabBarUnderlineStyle={{
            borderBottomWidth: 0,
            borderBottomColor: "red",
            backgroundColor: Pink,
          }}
        >
          <Tab
            tabStyle={{ backgroundColor: Pink }}
            activeTextStyle={{ color: "white" }}
            activeTabStyle={{
              borderBottomWidth: 0,
              backgroundColor: Pink,
              borderBottomColor: "red",
            }}
            heading={
              <TabHeading
                style={{
                  backgroundColor: Pink,
                  borderBottomColor: Pink,
                  flexDirection: "column",
                  marginTop: -10,
                }}
                activeTextStyle={{ color: "white" }}
                activeTabStyle={{ borderBottomWidth: 0, borderColor: Pink }}
                textStyle={{ color: "white" }}
              >
                <Icon
                  style={{ color: "white" }}
                  name="clipboard-text-outline"
                  type="MaterialCommunityIcons"
                />
                <Text style={{ color: "white", marginTop: 2 }}>Cases</Text>
              </TabHeading>
            }
          >
            {this.tab1()}
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: Pink }}
            activeTextStyle={{ color: "white" }}
            activeTabStyle={{
              borderBottomWidth: 0,
              backgroundColor: Pink,
              borderBottomColor: "red",
            }}
            heading={
              <TabHeading
                style={{
                  backgroundColor: Pink,
                  borderBottomColor: Pink,
                  flexDirection: "column",
                  marginTop: -10,
                }}
                activeTextStyle={{ color: "white" }}
                activeTabStyle={{ borderBottomWidth: 0, borderColor: Pink }}
                textStyle={{ color: "white" }}
              >
                <View
                  style={{
                    width: 60,
                    height: 60,
                    backgroundColor: Pink,
                    borderStyle: "solid",
                    borderWidth: 5,
                    borderColor: "white",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    marginTop: -60,
                  }}
                >
                  <Icon
                    style={{ color: "white", fontSize: 20 }}
                    name="plus"
                    type="AntDesign"
                  />
                </View>
              </TabHeading>
            }
          >
            {this.tab1()}
          </Tab>
          <Tab
            tabStyle={{ backgroundColor: Pink }}
            activeTextStyle={{ color: "white" }}
            activeTabStyle={{
              borderBottomWidth: 0,
              backgroundColor: Pink,
              borderBottomColor: "red",
            }}
            heading={
              <TabHeading
                style={{
                  backgroundColor: Pink,
                  borderBottomColor: Pink,
                  flexDirection: "column",
                  marginTop: -10,
                }}
                activeTextStyle={{ color: "white" }}
                activeTabStyle={{ borderBottomWidth: 0, borderColor: Pink }}
                textStyle={{ color: "white" }}
              >
                <Icon
                  style={{ color: "white" }}
                  name="ios-settings-sharp"
                  type="Ionicons"
                />
                <Text style={{ color: "white", marginTop: 2 }}>Settings</Text>
              </TabHeading>
            }
          >
            <Settings navigation={this.props.navigation} />
          </Tab>
        </Tabs>
      </SafeAreaView>
    );
  }
}
