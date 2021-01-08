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
  ActivityIndicator,
} from "react-native";
import { Pink } from "../../../config/Theme";
import Header from "../../../components/Header";
import { TextInputMask } from "react-native-masked-text";
import * as f from "firebase";
import { connect } from "react-redux";
import { mapStateToProps, ToastSuccess } from "../../../config/config";
import validator from "validator";

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
    creditCards: [],
    error: false,
    loading: false,
  };

  componentDidMount() {
    this.fetchCreditCards();
  }

  fetchCreditCards = () => {
    this.setState({ loading: true, error: false });
    const data = [];
    const user = this.props.auth.user;
    f.default
      .database()
      .ref("creditcards")
      .child(user.id)
      .once("value")
      .then((res) => {
        res.forEach((item, i) => {
          data.push({ ...item.val(), id: item.key });
        });
      })
      .then(() => {
        this.setState({ creditCards: data, loading: false, error: false });
      })
      .catch(() => {
        this.setState({ loading: false, error: true });
      });
  };

  saveCreditCard = () => {
    if (
      validator.isEmpty(`${this.state.crediCardNumber}`) ||
      !validator.isLength(this.state.crediCardNumber, 19) ||
      validator.isEmpty(this.state.name) ||
      validator.isEmpty(`${this.state.cvv}`) ||
      !validator.isLength(this.state.cvv, 3) ||
      validator.isEmpty(this.state.date) ||
      !validator.isLength(this.state.date, 5)
    ) {
      if (!validator.isLength(this.state.crediCardNumber, 19)) {
        this.setState({
          crediCardNumberErrorMessage: "Invalid credit card format",
          crediCardNumberError: true,
        });
      }

      if (validator.isEmpty(this.state.crediCardNumber)) {
        this.setState({
          crediCardNumberErrorMessage: "Enter credit card number",
          crediCardNumberError: true,
        });
      }

      if (validator.isEmpty(this.state.name)) {
        this.setState({
          nameErrorMessage: "Enter your name",
          nameError: true,
        });
      }

      if (!validator.isLength(this.state.cvv, 3)) {
        this.setState({
          cvvErrorMessage: "Invalid CVV format",
          cvvError: true,
        });
      }

      if (validator.isEmpty(this.state.cvv)) {
        this.setState({
          cvvErrorMessage: "Enter CVV",
          cvvError: true,
        });
      }

      if (!validator.isLength(this.state.date, 5)) {
        this.setState({
          dateErrorMessage: "Invalid date format",
          dateError: true,
        });
      }

      if (validator.isEmpty(this.state.date)) {
        this.setState({
          dateErrorMessage: "Enter date",
          dateError: true,
        });
      }

      return;
    }

    const user = this.props.auth.user;
    const { crediCardNumber, name, cvv, date } = this.state;
    const data = { crediCardNumber, name, cvv, date };

    this.setState({ paymentLoading: true });

    f.default
      .database()
      .ref("creditcards")
      .child(user.id)
      .push(data)
      .then(() => {
        ToastSuccess("Success", "Creditcard added successfully");
        this.setState({ paymentLoading: false, modal: false });
        this.fetchCreditCards();
      })
      .catch(() => {
        ToastSuccess("Error", "Some error Occoured, please try again");
        this.setState({ paymentLoading: false });
      });
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
                          onPress={() => this.saveCreditCard()}
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
        {this.state.creditCards.length > 0 ? (
          <ScrollView style={{ width: "100%" }}>
            <View style={{ width: "100%", alignItems: "center" }}>
              <View style={{ width: "90%" }}>
                {this.state.creditCards.map((item, i) => (
                  <View
                    key={i}
                    style={{
                      width: "100%",
                      shadowColor: "#000",
                      shadowOffset: {
                        width: 0,
                        height: 1,
                      },
                      shadowOpacity: 0.22,
                      shadowRadius: 2.22,

                      elevation: 3,
                      marginTop: 10,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <ImageBackground
                      style={{ width: "100%", height: 200 }}
                      resizeMode="contain"
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
                            {item.crediCardNumber}
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
                              {item.date}
                            </Text>
                            <Text
                              style={{
                                color: "white",
                                fontSize: 13,
                              }}
                            >
                              {item.name?.length > 22
                                ? `${item.name?.slice(0, 22)}...`
                                : item.name}
                            </Text>
                          </View>
                        </View>
                      </View>
                    </ImageBackground>
                  </View>
                ))}
              </View>
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
              onPress={() => this.fetchCreditCards()}
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
        ) : !this.state.error &&
          this.state.creditCards.length == 0 &&
          !this.state.loading ? (
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
              You dont have any payment methods saved...!
            </Text>
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
          </View>
        )}

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
