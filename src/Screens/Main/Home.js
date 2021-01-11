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
import { green, Pink } from "../../config/Theme";
import { Container, Header, Tab, Tabs, TabHeading, Icon } from "native-base";
import Settings from "./Settings/Settings";
import { connect } from "react-redux";
import { mapStateToProps } from "../../config/config";
import { getList } from "../../redux/actions/HomeActions";
import moment from "moment";

class Home extends Component {
  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      this.fecthList();
    });
  }

  fecthList = () => {
    this.setState({
      list: [],
      loading: true,
      error: false,
    });

    this.props
      .getList(this.props.auth.user?.id)
      .then((res) => {
        this.setState({
          list: res,
          loading: false,
          error: false,
        });
      })
      .catch(() => {
        this.setState({
          list: [],
          loading: false,
          error: true,
        });
      });
  };

  state = {
    list: [],
    loading: true,
    error: false,
  };

  tab1 = () => (
    <View style={{ width: "100%", flex: 1 }}>
      {this.state.list.length > 0 ? (
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{ width: "100%" }}
        >
          <View style={{ width: "100%", alignItems: "center", marginTop: 20 }}>
            {this.state.list.map((item, i) => (
              <TouchableOpacity
                onPress={() =>
                  this.props.navigation.navigate("TicketDetail", {
                    ticket: item,
                  })
                }
                key={i}
                style={{
                  width: "100%",
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
                    source={{ uri: item?.lawyer?.image }}
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
                    {item?.lawyer?.name}
                  </Text>
                  <Text
                    numberOfLines={3}
                    style={{
                      color: "gray",
                      marginTop: 5,
                      fontSize: 13,
                    }}
                  >
                    {item?.lawyer?.state}
                  </Text>

                  <View
                    style={{
                      width: "100%",
                      flexDirection: "row",
                      justifyContent: "space-between",
                      marginTop: 0,
                      alignItems: "center",
                    }}
                  >
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 13,
                          color: "green",
                        }}
                      >
                        {/* 100% Moneyback Guarantee */}
                        Booked on {moment(item.date).format("MMMM D, YYYY")}
                      </Text>
                    </View>

                    <View style={{ alignItems: "center", marginRight: 10 }}>
                      <Text style={{ color: "black", fontSize: 10 }}>
                        Status
                      </Text>
                      <View
                        style={{
                          backgroundColor:
                            item?.status == 0
                              ? "tomato"
                              : item?.status == 6
                              ? green
                              : Pink,
                          borderRadius: 5,
                          paddingHorizontal: 8,
                          alignItems: "center",
                          justifyContent: "center",
                          paddingVertical: 2,
                          marginTop: 2,
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                          }}
                        >
                          {item?.status == 1
                            ? "Pending"
                            : item?.status == 0
                            ? "Cancelled"
                            : item?.status == 2
                            ? "Appearance Filed"
                            : item?.status == 3
                            ? "Hearing Scheduled"
                            : item?.status == 4
                            ? "Required"
                            : item?.status == 5
                            ? "Required"
                            : item?.status == 6
                            ? "Completed"
                            : null}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      ) : this.state.error ? (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ fontSize: 20 }}>Some error occoured</Text>
          <TouchableOpacity
            style={{
              padding: 10,
              paddingHorizontal: 20,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Pink,
            }}
          >
            <Text style={{ color: "white" }}>retry</Text>
          </TouchableOpacity>
        </View>
      ) : this.state.loading ? (
        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color={Pink} />
          <Text style={{ marginTop: 10 }}>Loading</Text>
        </View>
      ) : (
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
            <Text style={{ color: "white", fontSize: 17 }}>
              Fight a new ticket
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
              bordersBottomColor: "red",
            }}
            heading={
              <TouchableOpacity
                onPress={() => this.props.navigation.navigate("States")}
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
                <TouchableOpacity
                  onPress={() => this.props.navigation.navigate("States")}
                  style={{
                    marginTop: -40,
                    padding: 10,
                    zIndex: 99,
                  }}
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
                    }}
                  >
                    <Icon
                      style={{ color: "white", fontSize: 20 }}
                      name="plus"
                      type="AntDesign"
                    />
                  </View>
                </TouchableOpacity>
              </TouchableOpacity>
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

export default connect(mapStateToProps, { getList })(Home);
