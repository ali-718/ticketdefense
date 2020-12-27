import { Icon } from "native-base";
import React, { Component } from "react";
import {
  Dimensions,
  Image,
  ImageBackground,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Blue, Pink } from "../config/Theme";
import CheckBox from "react-native-check-box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class Login extends Component {
  state = {
    selectedSection: 0,
    Email: "",
    Password: "",
    remeberMe: false,
  };

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <SafeAreaView
          style={{
            width: "100%",
            height: Dimensions.get("window").height,
            flex: 1,
          }}
        >
          <View
            style={{
              width: "100%",
              backgroundColor: Pink,
              flex: 1,
            }}
          >
            <ImageBackground
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                // height: 250,
                flex: 1,
              }}
              source={require("../../assets/road.png")}
            >
              <Image
                style={{ width: 300, height: 90, resizeMode: "contain" }}
                source={require("../../assets/logo.png")}
              />
              <Text style={{ color: "white", marginTop: 10, fontSize: 18 }}>
                An All-In One Traffic Ticket Platform
              </Text>
            </ImageBackground>

            <View
              style={{
                width: "100%",
                alignItems: "center",
                marginTop: -40,
              }}
            >
              <View
                style={{
                  width: "95%",
                  padding: 20,
                  backgroundColor: "white",
                  borderRadius: 20,
                  paddingHorizontal: 30,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <TouchableOpacity
                    style={{
                      borderBottomWidth:
                        this.state.selectedSection == 0 ? 1 : 0,
                      borderColor: "red",
                      borderStyle: "solid",
                    }}
                    onPress={() => this.setState({ selectedSection: 0 })}
                  >
                    <Text
                      style={{
                        color: this.state.selectedSection == 0 ? Blue : "gray",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      LOGIN
                    </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      borderBottomWidth:
                        this.state.selectedSection == 1 ? 1 : 0,
                      borderColor: "red",
                      borderStyle: "solid",
                    }}
                    onPress={() => this.setState({ selectedSection: 1 })}
                  >
                    <Text
                      style={{
                        color: this.state.selectedSection == 1 ? Blue : "gray",
                        fontWeight: "bold",
                        fontSize: 18,
                      }}
                    >
                      SIGNUP
                    </Text>
                  </TouchableOpacity>
                </View>

                {this.state.selectedSection == 0 ? (
                  <View style={{ width: "100%", marginVertical: 40 }}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: "black",
                        borderStyle: "solid",
                        paddingBottom: 5,
                      }}
                    >
                      <Icon
                        name="mail"
                        type="AntDesign"
                        style={{ fontSize: 25 }}
                      />
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextInput
                          autoCapitalize="none"
                          style={{
                            alignItems: "center",
                            fontSize: 18,
                          }}
                          placeholder="Email"
                          placeholderTextColor="black"
                          onChangeText={(val) => this.setState({ Email: val })}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: "black",
                        borderStyle: "solid",
                        paddingBottom: 5,
                        marginTop: 30,
                      }}
                    >
                      <Icon
                        name="lock"
                        type="FontAwesome"
                        style={{ fontSize: 25 }}
                      />
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextInput
                          autoCapitalize="none"
                          style={{
                            alignItems: "center",
                            fontSize: 18,
                          }}
                          placeholder="Password"
                          placeholderTextColor="black"
                          onChangeText={(val) =>
                            this.setState({ Password: val })
                          }
                          secureTextEntry
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        marginTop: 30,
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <CheckBox
                          style={{ flex: 1 }}
                          onClick={() => {
                            this.setState({
                              remeberMe: !this.state.remeberMe,
                            });
                          }}
                          isChecked={this.state.remeberMe}
                        />
                        <Text style={{ color: Blue, marginLeft: 30 }}>
                          Remember me
                        </Text>
                      </View>

                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Text style={{ color: Blue, marginLeft: 30 }}>
                          Forgot Password ?
                        </Text>
                      </View>
                    </View>
                  </View>
                ) : (
                  <View style={{ width: "100%", marginVertical: 40 }}>
                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: "black",
                        borderStyle: "solid",
                        paddingBottom: 5,
                      }}
                    >
                      <Icon
                        name="person-outline"
                        type="Ionicons"
                        style={{ fontSize: 25 }}
                      />
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextInput
                          autoCapitalize="none"
                          style={{
                            alignItems: "center",
                            fontSize: 18,
                          }}
                          placeholder="Name"
                          placeholderTextColor="black"
                          onChangeText={(val) => this.setState({ Name: val })}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: "black",
                        borderStyle: "solid",
                        paddingBottom: 5,
                        marginTop: 30,
                      }}
                    >
                      <Icon
                        name="mail"
                        type="AntDesign"
                        style={{ fontSize: 25 }}
                      />
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextInput
                          autoCapitalize="none"
                          style={{
                            alignItems: "center",
                            fontSize: 18,
                          }}
                          placeholder="Email"
                          placeholderTextColor="black"
                          onChangeText={(val) => this.setState({ Email: val })}
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: "black",
                        borderStyle: "solid",
                        paddingBottom: 5,
                        marginTop: 30,
                      }}
                    >
                      <Icon
                        name="lock"
                        type="FontAwesome"
                        style={{ fontSize: 25 }}
                      />
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextInput
                          autoCapitalize="none"
                          style={{
                            alignItems: "center",
                            fontSize: 18,
                          }}
                          placeholder="Password"
                          placeholderTextColor="black"
                          onChangeText={(val) =>
                            this.setState({ Password: val })
                          }
                          secureTextEntry
                        />
                      </View>
                    </View>

                    <View
                      style={{
                        width: "100%",
                        flexDirection: "row",
                        borderBottomWidth: 0.5,
                        borderColor: "black",
                        borderStyle: "solid",
                        paddingBottom: 5,
                        marginTop: 30,
                      }}
                    >
                      <Icon
                        name="mail"
                        type="AntDesign"
                        style={{ fontSize: 25 }}
                      />
                      <View
                        style={{
                          flex: 1,
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <TextInput
                          autoCapitalize="none"
                          style={{
                            alignItems: "center",
                            fontSize: 18,
                          }}
                          placeholder="Phone Number"
                          placeholderTextColor="black"
                          onChangeText={(val) => this.setState({ Phone: val })}
                          keyboardType="numeric"
                        />
                      </View>
                    </View>
                  </View>
                )}
              </View>

              {/* button */}
              <View
                style={{
                  width: "100%",
                  alignItems: "center",
                  marginTop: -40,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: Pink,
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: 100,
                    borderWidth: 5,
                    borderStyle: "solid",
                    borderColor: "white",
                    width: 70,
                    height: 70,
                  }}
                >
                  <Icon
                    style={{ fontSize: 35, color: "white" }}
                    name="long-arrow-alt-right"
                    type="FontAwesome5"
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0.45,
                justifyContent: "flex-end",
                width: "100%",
              }}
            >
              <View
                style={{
                  width: "100%",
                  height: 80,
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 10,
                }}
              >
                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 100,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    paddingHorizontal: 10,
                  }}
                >
                  <Icon
                    name="facebook-f"
                    type="FontAwesome"
                    style={{ fontSize: 18, color: Blue }}
                  />
                  <Text style={{ marginLeft: 10, color: Blue, fontSize: 12 }}>
                    Sign in with Facebook
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={{
                    backgroundColor: "white",
                    borderRadius: 100,
                    flexDirection: "row",
                    alignItems: "center",
                    justifyContent: "center",
                    height: 50,
                    paddingHorizontal: 10,
                  }}
                >
                  <Icon
                    name="googleplus"
                    type="AntDesign"
                    style={{ fontSize: 18, color: Blue }}
                  />
                  <Text style={{ marginLeft: 10, color: Blue, fontSize: 12 }}>
                    Sign in with Google
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}
