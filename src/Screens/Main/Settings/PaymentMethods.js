import { Icon, Picker } from "native-base";
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
import { Pink } from "../../../config/Theme";
import Header from "../../../components/Header";
import { TextInputMask } from "react-native-masked-text";
import * as f from "firebase";
import { connect } from "react-redux";

class PaymentMethods extends Component {
  state = {
    modal: false,
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
    amount: "",
    amountError: false,
    amountErrorMessage: "",
    frequentAmount: "",
    donationType: [],
    selectedDonationType: "",
    selectedDonationTypeError: false,
    success: false,
    donationFreuency: [],
    selectedDontaionFrequency: "",
    placeDetails: {},
    fieldsErrorToggle: false,
    errorMessage: "",
    paymentLoading: false,
    selectPaymentWay: false,
    selectPaymentWayError: false,
  };

  componentDidMount() {
    const user = this.props.auth.user;
    f.default
      .database()
      .ref("creditcards")
      .child(user.id)
      .once("value")
      .then((res) => {
        console.log(res.val());
      });
  }

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
        <Modal visible={this.state.modal} animationType="slide">
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%", flex: 1 }}
          >
            <View style={{ width: "100%", flex: 1, alignItems: "center" }}>
              <View style={{ width: "100%", marginTop: 20 }}>
                <ImageBackground
                  style={{ width: "100%", height: 200, maxWidth: 350 }}
                  source={require("../../../../assets/creditCard.png")}
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
                            Save
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => this.setState({ modal: false })}
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
            alignItems: "center",
            marginTop: 20,
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 25, color: "black", fontWeight: "bold" }}>
              Saved Payment Methods
            </Text>
          </View>
        </View>

        <View
          style={{
            width: "100%",
            flex: 1,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              fontSize: 15,
              color: "gray",
              width: "90%",
            }}
          >
            When did you get your ticket? You dont have any payment methods
            saved...!
          </Text>
        </View>
        <View
          style={{
            width: "100%",

            alignItems: "flex-end",
            padding: 15,
          }}
        >
          <TouchableOpacity
            onPress={() => this.setState({ modal: true })}
            style={{
              width: 45,
              height: 45,
              borderRadius: 100,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: Pink,
            }}
          >
            <Icon
              style={{ color: "white", fontSize: 20 }}
              name="plus"
              type="AntDesign"
            />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(PaymentMethods);
