import { Icon } from "native-base";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Dimensions,
  Image,
  ImageBackground,
  Modal,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Blue, Pink } from "../../config/Theme";
import CheckBox from "react-native-check-box";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as f from "firebase";
import validator from "validator";
import { Signup, SignIn } from "../../redux/actions/AuthActions";
import { connect } from "react-redux";
import { mapStateToProps, ToastError, ToastSuccess } from "../../config/config";

class Forgot extends Component {
  state = {
    Email: "",
    loading: false,
    modal: false,
    code: "",
  };

  Signup = () => {
    const { Email } = this.state;

    if (Email.trim() == "") {
      alert("Kindly fill your Email");
      return;
    }

    if (!validator.isEmail(Email)) {
      alert("Email format is incorrect");
      return;
    }

    f.default
      .auth()
      .sendPasswordResetEmail(Email)
      .then(() => {
        ToastSuccess(
          "Success",
          "An email has been sent to you of password reset"
        );
        this.props.navigation.pop();
      })
      .catch((e) => {
        ToastError(
          "Error",
          "There is no user with this Email registered with us"
        );
      });
  };

  render() {
    return (
      <KeyboardAwareScrollView style={{ flex: 1, backgroundColor: Pink }}>
        <Modal visible={this.state.modal} animationType="slide">
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
                width: "95%",
                borderRadius: 10,
                backgroundColor: "white",
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{ fontSize: 20, fontWeight: "bold", color: "black" }}
              >
                Enter the code that we've just emailed you.
              </Text>

              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  borderBottomWidth: 0.5,
                  borderColor: "black",
                  borderStyle: "solid",
                  paddingBottom: 5,
                  marginTop: 20,
                }}
              >
                <Icon name="dial-pad" type="Entypo" style={{ fontSize: 25 }} />
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
                    secureTextEntry={false}
                    placeholder="Enter Code"
                    placeholderTextColor="black"
                    onChangeText={(val) => this.setState({ code: val })}
                    value={this.state.code}
                    keyboardType="numeric"
                  />
                </View>
              </View>
            </View>
          </View>
        </Modal>
        <SafeAreaView
          style={{
            width: "100%",
            height: Dimensions.get("window").height,
            flex: 1,
            backgroundColor: Pink,
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
              source={require("../../../assets/road.png")}
            >
              <Image
                style={{ width: 300, height: 90, resizeMode: "contain" }}
                source={require("../../../assets/logo.png")}
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
                        secureTextEntry={false}
                        placeholder="Email"
                        placeholderTextColor="black"
                        onChangeText={(val) => this.setState({ Email: val })}
                        value={this.state.Email}
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
                      // onPress={() => {
                      //   this.setState({
                      //     remeberMe: !this.state.remeberMe,
                      //   });
                      // }}
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      {/* <CheckBox
                          style={{ borderWidth: 1 }}
                          checkedCheckBoxColor={Pink}
                          onClick={() => null}
                          isChecked={this.state.remeberMe}
                        />
                        <Text style={{ color: Blue, marginLeft: 30 }}>
                          Remember me
                        </Text> */}
                    </View>

                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => this.props.navigation.navigate("login")}
                      >
                        <Text style={{ color: Blue, marginLeft: 30 }}>
                          Go to Login ?
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
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
                  disabled={this.state.loading}
                  onPress={() => this.Signup()}
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
                  {this.state.loading ? (
                    <ActivityIndicator color="white" />
                  ) : (
                    <Icon
                      style={{ fontSize: 35, color: "white" }}
                      name="long-arrow-alt-right"
                      type="FontAwesome5"
                    />
                  )}
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                flex: 0.45,
                justifyContent: "flex-end",
                width: "100%",
              }}
            ></View>
          </View>
        </SafeAreaView>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(mapStateToProps, { Signup, SignIn })(Forgot);
