import { Icon } from "native-base";
import React, { Component } from "react";
import {
  Alert,
  Image,
  Modal,
  SafeAreaView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  ImageBackground,
  TextInput,
} from "react-native";
import Header from "../../components/Header";
import { Pink } from "../../config/Theme";
import { TextInputMask } from "react-native-masked-text";
import { connect } from "react-redux";
import { mapStateToProps } from "../../config/config";

class Checkout extends Component {
  state = {
    paymentModal: false,
    crediCardNumber: "",
    crediCardNumberError: false,
    crediCardNumberErrorMessage: "",
    date: "",
    dateError: false,
    dateErrorMessage: "",
    name: "",
    nameError: false,
    nameErrorMessage: "",
    cvv: "",
    cvvError: false,
    cvvErrorMessage: "",
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          backgroundColor: "white",
          paddingTop: StatusBar.currentHeight,
          alignItems: "center",
        }}
      >
        <Modal visible={this.state.paymentModal} animationType="slide">
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", flex: 1 }}
          >
            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
              <View style={{ width: "100%", marginTop: 20 }}>
                <ImageBackground
                  style={{ width: "100%", height: 200, maxWidth: 350 }}
                  source={require("../../../assets/creditCard.png")}
                >
                  <View style={{ width: "100%", flex: 1 }}>
                    <View style={{ marginTop: 80, marginLeft: 30 }}>
                      <Text
                        style={{
                          color: "white",
                          fontSize: 17,
                        }}
                      >
                        {this.state.crediCardNumber}
                      </Text>

                      <View
                        style={{
                          width: "90%",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: 40,
                          alignItems: "center",
                        }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 13,
                          }}
                        >
                          {this.state.date}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 13,
                          }}
                        >
                          {this.state.name?.length > 22
                            ? `${this.state.name?.slice(0, 22)}...`
                            : this.state.name}
                        </Text>
                      </View>
                    </View>
                  </View>
                </ImageBackground>
              </View>

              <View
                style={{ width: "100%", alignItems: "center", marginTop: 30 }}
              >
                <View
                  style={{
                    width: "90%",
                    alignItems: "center",
                    marginBottom: 40,
                  }}
                >
                  <View style={{ width: "100%" }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "300",
                        color: this.state.crediCardNumberError
                          ? "tomato"
                          : "gray",
                      }}
                    >
                      Card Number
                    </Text>
                    <TextInputMask
                      type={"credit-card"}
                      options={{
                        obfuscated: false,
                        issuer: "visa-or-mastercard",
                      }}
                      value={this.state.crediCardNumber}
                      onChangeText={(val) => {
                        this.setState({
                          crediCardNumber: val,
                          crediCardNumberError: false,
                          crediCardNumberErrorMessage: "",
                        });
                      }}
                      maxLength={19}
                      keyboardType="numeric"
                      style={{
                        width: "100%",
                        marginTop: 10,
                        borderStyle: "solid",
                        borderBottomWidth: 0.5,
                        borderColor: this.state.crediCardNumberError
                          ? "tomato"
                          : "gainsboro",
                        fontSize: 15,
                        padding: 5,
                      }}
                    />

                    {this.state.crediCardNumberError ? (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "300",
                          color: "tomato",
                          marginTop: 3,
                        }}
                      >
                        {this.state.crediCardNumberErrorMessage}
                      </Text>
                    ) : null}
                  </View>

                  <View style={{ width: "100%", marginTop: 30 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "300",
                        color: this.state.nameError ? "tomato" : "gray",
                      }}
                    >
                      Card Name
                    </Text>
                    <TextInput
                      autoCapitalize="none"
                      value={this.state.name}
                      onChangeText={(val) =>
                        this.setState({
                          name: val,
                          nameError: false,
                          nameErrorMessage: "",
                        })
                      }
                      style={{
                        width: "100%",
                        marginTop: 10,
                        borderStyle: "solid",
                        borderBottomWidth: 0.5,
                        borderColor: this.state.nameError
                          ? "tomato"
                          : "gainsboro",
                        fontSize: 15,
                        padding: 5,
                      }}
                    />
                    {this.state.nameError ? (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "300",
                          color: "tomato",
                          marginTop: 3,
                        }}
                      >
                        {this.state.nameErrorMessage}
                      </Text>
                    ) : null}
                  </View>

                  <View style={{ width: "100%", marginTop: 30 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "300",
                        color: this.state.cvvError ? "tomato" : "gray",
                      }}
                    >
                      CVV
                    </Text>
                    <TextInput
                      keyboardType="numeric"
                      maxLength={3}
                      value={this.state.cvv}
                      onChangeText={(val) =>
                        this.setState({
                          cvv: val,
                          cvvError: false,
                          cvvErrorMessage: "",
                        })
                      }
                      style={{
                        width: "100%",
                        marginTop: 10,
                        borderStyle: "solid",
                        borderBottomWidth: 0.5,
                        borderColor: this.state.cvvError
                          ? "tomato"
                          : "gainsboro",
                        fontSize: 15,
                        padding: 5,
                      }}
                    />
                    {this.state.cvvError ? (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "300",
                          color: "tomato",
                          marginTop: 3,
                        }}
                      >
                        {this.state.cvvErrorMessage}
                      </Text>
                    ) : null}
                  </View>

                  <View style={{ width: "100%", marginTop: 30 }}>
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "300",
                        color: this.state.dateError ? "tomato" : "gray",
                      }}
                    >
                      Card Expiry Date
                    </Text>
                    <TextInputMask
                      type={"datetime"}
                      options={{
                        format: "DD/YY",
                      }}
                      value={this.state.date}
                      onChangeText={(val) =>
                        this.setState({
                          date: val,
                          dateError: false,
                          dateErrorMessage: "",
                        })
                      }
                      style={{
                        width: "100%",
                        marginTop: 10,
                        borderStyle: "solid",
                        borderBottomWidth: 0.5,
                        borderColor: this.state.dateError
                          ? "tomato"
                          : "gainsboro",
                        fontSize: 15,
                        padding: 5,
                      }}
                    />
                    {this.state.dateError ? (
                      <Text
                        style={{
                          fontSize: 12,
                          fontWeight: "300",
                          color: "tomato",
                          marginTop: 3,
                        }}
                      >
                        {this.state.dateErrorMessage}
                      </Text>
                    ) : null}
                  </View>

                  <View style={{ width: "100%", marginTop: 40 }}>
                    {this.state.paymentLoading ? (
                      <ActivityIndicator size="large" color={Pink} />
                    ) : (
                      <>
                        <TouchableOpacity
                          style={{
                            width: "100%",
                            padding: 15,
                            borderRadius: 10,
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: Pink,
                          }}
                        >
                          <Text style={{ color: "white", fontWeight: "bold" }}>
                            Make payment
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => this.setState({ paymentModal: false })}
                          style={{ marginTop: 20, alignSelf: "center" }}
                        >
                          <Text
                            style={{
                              color: "red",
                              textDecorationLine: "underline",
                            }}
                          >
                            cancel
                          </Text>
                        </TouchableOpacity>
                      </>
                    )}
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </Modal>
        <Header navigation={this.props.navigation} />

        <View
          style={{
            width: "90%",
            flex: 1,
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Payment
            </Text>
            <Text
              style={{
                fontSize: 15,
                marginTop: 5,
                color: "gray",
                // textAlign: "center",
                width: "100%",
              }}
            >
              You are one step away from being matched with local{" "}
              {this.props.auth.ticket?.state} attorney who will contest your
              ticket in court
            </Text>
          </View>

          <View style={{ width: "100%", marginTop: 40 }}>
            <Text style={{ fontSize: 18, color: "black", fontWeight: "bold" }}>
              Your flat fee
            </Text>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 20,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                }}
              >
                Legal fee
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                }}
              >
                $345
              </Text>
            </View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                }}
              >
                Service fee
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "gray",
                }}
              >
                $0
              </Text>
            </View>
            <View
              style={{
                marginTop: 10,
                width: "100%",
                height: 1,
                backgroundColor: "black",
              }}
            ></View>

            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
              }}
            >
              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                Total
              </Text>

              <Text
                style={{
                  fontSize: 16,
                  color: "black",
                  fontWeight: "bold",
                }}
              >
                $345
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => this.setState({ paymentModal: true })}
              style={{
                width: "100%",
                height: 50,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Pink,
                borderRadius: 10,
                marginTop: 30,
              }}
            >
              <Text
                style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
              >
                Pay now
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Checkout);
