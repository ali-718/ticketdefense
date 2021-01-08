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
  ActivityIndicator,
} from "react-native";
import Header from "../../components/Header";
import { Pink } from "../../config/Theme";
import { TextInputMask } from "react-native-masked-text";
import { connect } from "react-redux";
import { mapStateToProps, ToastError, ToastSuccess } from "../../config/config";
import * as f from "firebase";
import {
  createToken,
  createPayment,
  clearAll,
} from "../../redux/actions/HomeActions";
import validator from "validator";
import { StackActions } from "@react-navigation/native";

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
    Cardloading: true,
    CardError: false,
    creditCards: [],
    existingCardModal: false,
    selectedCard: {},
    paymentLoading: false,
  };

  componentDidMount() {
    this.fetchCreditCards();
  }

  processPayment = () => {
    if (this.state.selectedCard?.id) {
      this.setState({ paymentLoading: true });
      this.props
        .createToken({
          ...this.state.selectedCard,
          state: this.props.auth.ticket?.state,
        })
        .then((res) => {
          this.props
            .createPayment(res.id, this.props.auth?.ticket?.lawyer?.price)
            .then((res) => {
              f.default
                .database()
                .ref("list")
                .child(this.props.auth.user.id)
                .push({
                  ...res,
                  user: this.props.auth.user,
                  lawyer: this.props.auth?.ticket?.lawyer,
                  violation: {
                    type: this.props.auth?.ticket?.violationType,
                    state: this.props.auth?.ticket?.state,
                    points: this.props.auth?.ticket?.points,
                  },
                })
                .then(() => {
                  this.setState({
                    paymentLoading: false,
                    existingCardModal: false,
                  });
                  ToastSuccess("Success", "Payment is successfull");
                  this.props.clearAll();
                  this.props.navigation.popToTop();
                });
            })
            .catch((e) => {
              ToastError("Error!", e);
            });
        })
        .catch((e) => {
          ToastError("Error!", e);
        });

      return;
    }

    this.setState({ paymentLoading: true });

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

    this.props
      .createToken({
        crediCardNumber: this.state.crediCardNumber,
        cvv: this.state.cvv,
        date: this.state.date,
        name: this.state.name,
        state: this.props.auth.ticket?.state,
      })
      .then((res) => {
        this.props
          .createPayment(res.id, this.props.auth?.ticket?.lawyer?.price)
          .then((res) => {
            f.default
              .database()
              .ref("list")
              .child(this.props.auth.user.id)
              .push({
                ...res,
                user: this.props.auth.user,
                lawyer: this.props.auth?.ticket?.lawyer,
                violation: {
                  type: this.props.auth?.ticket?.violationType,
                  state: this.props.auth?.ticket?.state,
                  points: this.props.auth?.ticket?.points,
                },
              })
              .then(() => {
                this.setState({
                  paymentLoading: false,
                  existingCardModal: false,
                });
                ToastSuccess("Success", "Payment is successfull");
                this.props.clearAll();
                this.props.navigation.popToTop();
                // this.props.navigation.replace("Home");
              });
          })
          .catch((e) => {
            ToastError("Error!", e);
          });
      })
      .catch((e) => {
        ToastError("Error!", e);
      });
  };

  fetchCreditCards = () => {
    this.setState({ Cardloading: true, CardError: false });
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
        this.setState({
          creditCards: data,
          Cardloading: false,
          CardError: false,
        });
      })
      .catch(() => {
        this.setState({ Cardloading: false, CardError: true });
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
        <Modal
          onRequestClose={() => null}
          visible={this.state.existingCardModal}
          animationType="slide"
        >
          <SafeAreaView
            style={{ width: "100%", flex: 1, alignItems: "center" }}
          >
            {this.state.creditCards.length > 0 ? (
              <ScrollView style={{ width: "100%" }}>
                <View
                  style={{ width: "100%", alignItems: "center", marginTop: 10 }}
                >
                  <Text
                    style={{ fontSize: 20, color: "black", fontWeight: "bold" }}
                  >
                    My Credit cards
                  </Text>
                  <View style={{ width: "90%" }}>
                    {this.state.creditCards.map((item, i) => (
                      <TouchableOpacity
                        onPress={() => this.setState({ selectedCard: item })}
                        key={i}
                        style={
                          this.state.selectedCard?.id == item.id
                            ? {
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
                              }
                            : {
                                width: "100%",

                                marginTop: 10,
                                alignItems: "center",
                              }
                        }
                      >
                        {this.state.selectedCard?.id == item.id ? (
                          <View
                            style={{
                              width: "100%",
                              position: "absolute",
                              alignItems: "flex-end",
                              zIndex: 99,
                              padding: 10,
                            }}
                          >
                            <Image
                              style={{ width: 30, height: 30 }}
                              resizeMode="contain"
                              source={require("../../../assets/checked.png")}
                            />
                          </View>
                        ) : null}
                        <ImageBackground
                          style={{ width: "100%", height: 200 }}
                          resizeMode="contain"
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
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </ScrollView>
            ) : this.state.CardError ? (
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
            ) : !this.state.CardError &&
              this.state.creditCards.length == 0 &&
              !this.state.Cardloading ? (
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
                alignItems: "center",
                justifyContent: "center",
                padding: 20,
              }}
            >
              {this.state.selectedCard?.id ? (
                this.state.paymentLoading ? (
                  <ActivityIndicator
                    style={{ marginBottom: 15 }}
                    size="large"
                    color={Pink}
                  />
                ) : (
                  <>
                    <TouchableOpacity
                      onPress={() => this.processPayment()}
                      style={{
                        width: "100%",
                        padding: 15,
                        borderRadius: 10,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: Pink,
                        marginBottom: 15,
                      }}
                    >
                      <Text style={{ color: "white", fontWeight: "bold" }}>
                        Pay now
                      </Text>
                    </TouchableOpacity>
                  </>
                )
              ) : null}
              <TouchableOpacity
                onPress={() =>
                  this.setState({ existingCardModal: false, selectedCard: {} })
                }
                disabled={this.state.paymentLoading}
                style={{ alignSelf: "center" }}
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
            </View>
          </SafeAreaView>
        </Modal>
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
                          onPress={() => this.processPayment()}
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
                            Pay now
                          </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                          onPress={() => this.setState({ paymentModal: false })}
                          style={{ marginTop: 20, alignSelf: "center" }}
                          disabled={this.state.paymentLoading}
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

            <View style={{ width: "100%", marginTop: 40 }}>
              <Text
                style={{ fontSize: 16, color: "black", fontWeight: "bold" }}
              >
                Payment options
              </Text>
              <TouchableOpacity
                onPress={() => this.setState({ paymentModal: true })}
                style={{
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: Pink,
                  borderRadius: 10,
                  marginTop: 20,
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
                >
                  Add new card
                </Text>
              </TouchableOpacity>

              <Text
                style={{
                  fontSize: 15,
                  marginVertical: 20,
                  color: "gray",
                  width: "100%",
                  textAlign: "center",
                }}
              >
                or
              </Text>

              <TouchableOpacity
                onPress={() => this.setState({ existingCardModal: true })}
                style={{
                  width: "100%",
                  height: 50,
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 10,
                  borderColor: Pink,
                  borderWidth: 1,
                  borderStyle: "solid",
                }}
              >
                <Text style={{ color: Pink, fontSize: 17, fontWeight: "bold" }}>
                  Select from existing card
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, {
  createToken,
  createPayment,
  clearAll,
})(Checkout);
