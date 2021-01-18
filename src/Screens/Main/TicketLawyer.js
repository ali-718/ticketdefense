import { Icon } from "native-base";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
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
import { Pink } from "../../config/Theme";
import { getLawyers, setLawyer } from "../../redux/actions/HomeActions";

class TicketLawyer extends Component {
  state = {
    lawyers: [],
    loading: false,
    error: false,
    allLawyers: [],
  };

  componentDidMount() {
    this.props
      .getLawyers()
      .then((res) => {
        this.setState({
          allLawyers: res,
          lawyers: res,
          loading: false,
          error: false,
        });
      })
      .catch((e) => {
        this.setState({
          allLawyers: [],
          lawyers: [],
          loading: false,
          error: true,
        });
      });
  }

  search = (text) => {
    const keyword = text?.toLowerCase();
    const realData = this.state.allLawyers;
    const finalData = realData.filter((item) =>
      item.name?.toLowerCase()?.includes(keyword)
    );

    this.setState({ lawyers: finalData });
  };

  continue = (item) => {
    this.props.setLawyer(item);
    this.props.navigation.navigate("Checkout");
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
            <Text
              style={{
                fontSize: 20,
                color: "black",
                fontWeight: "bold",
                marginBottom: 20,
              }}
            >
              Congratulations following lawyer
            </Text>
            {/* </View> */}

            {/* <View style={{ width: "100%", marginTop: 20 }}>
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
            </View> */}

            {/* states */}
            {this.state.lawyers.length > 0 ? (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "100%", paddingBottom: 40, paddingTop: 0 }}
              >
                {this.state.lawyers.filter(
                  (item) =>
                    item.state?.toLowerCase() ==
                    this.props.auth.ticket?.state?.toLowerCase()
                ).length > 0 ? (
                  this.state.lawyers
                    .filter(
                      (item) =>
                        item.state?.toLowerCase() ==
                        this.props.auth.ticket?.state?.toLowerCase()
                    )
                    .map((item, i) => (
                      <TouchableOpacity
                        onPress={() => this.continue(item)}
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
                              fontSize: 13,
                              fontWeight: "bold",
                            }}
                          >
                            {item.name}
                          </Text>
                          <Text
                            numberOfLines={3}
                            style={{
                              color: "gray",
                              marginTop: 5,
                              fontSize: 13,
                            }}
                          >
                            {item.state}
                          </Text>
                          <Text
                            numberOfLines={3}
                            style={{
                              marginTop: 5,
                              fontSize: 13,
                              color: "green",
                            }}
                          >
                            100% Moneyback Guarantee
                          </Text>
                          <View
                            style={{
                              width: "100%",
                              flexDirection: "row",
                              justifyContent: "space-between",
                              marginTop: 0,
                            }}
                          >
                            <View
                              style={{
                                flexDirection: "row",
                                alignItems: "center",
                              }}
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
                                style={{
                                  color: Pink,
                                  marginTop: 1,
                                  fontSize: 12,
                                }}
                              >
                                ${item.price}
                              </Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    ))
                ) : (
                  <View
                    style={{
                      width: "100%",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <Text>No lawyers present in current state...!</Text>
                  </View>
                )}
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
                  onPress={() => {
                    this.props
                      .getLawyers()
                      .then((res) => {
                        this.setState({
                          allLawyers: res,
                          lawyers: res,
                          loading: false,
                          error: false,
                        });
                      })
                      .catch((e) => {
                        this.setState({
                          allLawyers: [],
                          lawyers: [],
                          loading: false,
                          error: true,
                        });
                      });
                  }}
                  style={{
                    padding: 10,
                    paddingHorizontal: 20,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Pink,
                    marginTop: 20,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>retry</Text>
                </TouchableOpacity>
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
                <ActivityIndicator size="large" color={Pink} />
                <Text style={{ marginTop: 10 }}>Loading</Text>
              </View>
            )}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, { getLawyers, setLawyer })(
  TicketLawyer
);
