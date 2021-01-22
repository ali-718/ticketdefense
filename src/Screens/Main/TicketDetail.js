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
  Modal,
} from "react-native";
import { Pink } from "../../config/Theme";
import { Container, Tab, Tabs, TabHeading, Icon, Textarea } from "native-base";
import Settings from "./Settings/Settings";
import { connect } from "react-redux";
import { mapStateToProps, ToastError, ToastSuccess } from "../../config/config";
import { getList } from "../../redux/actions/HomeActions";
import moment from "moment";
import Header from "../../components/Header";
import * as f from "firebase";

class TicketDetail extends Component {
  state = {
    ticket: {},
    cancelModal: false,
    reason: "",
    loading: false,
  };

  componentDidMount() {
    const ticket = this.props.route.params.ticket;

    this.setState({ ticket });
  }

  cancelCase = () => {
    this.setState({ loading: true });
    f.default
      .database()
      .ref("list")
      .child(this.props.auth?.user?.id)
      .child(this.state.ticket?.id)
      .update({ status: 0, reason: this.state.reason })
      .then(() => {
        this.setState({ loading: false });
        this.props.navigation.goBack();
        ToastSuccess("Success", "Your case is cancelled");
      })
      .catch(() => {
        this.setState({ loading: false });
        ToastError("Error", "Some error occoured, please try again later");
      });
  };

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
        <Modal
          visible={this.state.cancelModal}
          animationType="slide"
          transparent
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "90%",
                borderRadius: 10,
                backgroundColor: "white",
                padding: 10,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View style={{ width: "100%", alignItems: "center" }}>
                <Text
                  style={{ fontSize: 16, color: "black", fontWeight: "bold" }}
                >
                  We're sorry to see you go!
                </Text>
                <Text style={{ fontSize: 13, color: "gray", marginTop: 10 }}>
                  Please tell us why you are cancelling. This will help us
                  improve our service.
                </Text>
                <Textarea
                  style={{
                    fontSize: 13,
                    color: "black",
                    width: "100%",
                    borderWidth: 0.5,
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                  placeholder="Why are you cancelling?"
                  placeholderTextColor="gray"
                  rowSpan={5}
                  value={this.state.reason}
                  onChangeText={(val) => this.setState({ reason: val })}
                ></Textarea>

                <TouchableOpacity
                  onPress={() => this.cancelCase()}
                  disabled={this.state.loading}
                  style={{
                    width: "100%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "tomato",
                    borderRadius: 10,
                    marginTop: 20,
                  }}
                >
                  {this.state.loading ? (
                    <ActivityIndicator size="large" color="white" />
                  ) : (
                    <Text
                      style={{
                        color: "white",
                        fontSize: 17,
                        fontWeight: "bold",
                      }}
                    >
                      Yes, Cancel case
                    </Text>
                  )}
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() =>
                    this.setState({ cancelModal: false, reason: "" })
                  }
                  style={{
                    width: "100%",
                    alignItems: "center",
                    marginTop: 20,
                    marginBottom: 20,
                  }}
                >
                  <Text
                    style={{ color: "black", fontSize: 17, fontWeight: "bold" }}
                  >
                    No, don't Cancel my case
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Header noBack navigation={this.props.navigation} />
        <ScrollView
          style={{ width: "100%", flex: 1 }}
          showsVerticalScrollIndicator={false}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              paddingVertical: 20,
              alignItems: "center",
            }}
          >
            <View style={{ width: "90%" }}>
              <Text
                style={{ fontSize: 18, color: "black", fontWeight: "bold" }}
              >
                Your ticket from{" "}
                {moment(this.state.ticket?.date).format("MMMM D, YYYY")}
              </Text>

              <View
                style={{
                  width: "100%",
                  backgroundColor: "rgb(242, 201, 223)",
                  padding: 15,
                  marginTop: 20,
                  alignItems: "center",
                  borderRadius: 10,
                }}
              >
                <View
                  style={{
                    width: "100%",
                    flexDirection: "row",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("LawyerProfile", {
                        Lawyer: this.state.ticket?.lawyer,
                        isPrice: false,
                      })
                    }
                    style={{
                      width: 70,
                      alignItems: "flex-start",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ width: 60, height: 60, borderRadius: 100 }}
                      source={{ uri: this.state.ticket?.lawyer?.image }}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("LawyerProfile", {
                        Lawyer: this.state.ticket?.lawyer,
                        isPrice: false,
                      })
                    }
                    style={{ flex: 1, marginLeft: 5 }}
                  >
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "black",
                        fontSize: 13,
                        fontWeight: "bold",
                        width: "90%",
                      }}
                    >
                      Handling your case
                    </Text>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: "black",
                        fontSize: 14,
                        width: "100%",
                        marginTop: 5,
                      }}
                    >
                      {this.state.ticket?.lawyer?.name}
                    </Text>
                  </TouchableOpacity>
                </View>
                {this.state.ticket?.status == 0 ? null : (
                  <TouchableOpacity
                    onPress={() =>
                      this.props.navigation.navigate("Message", {
                        data: this.state.ticket,
                      })
                    }
                    style={{
                      width: "100%",
                      height: 50,
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 10,
                      borderColor: Pink,
                      borderWidth: 1,
                      borderStyle: "solid",
                      marginTop: 20,
                    }}
                  >
                    <Text
                      style={{ color: Pink, fontSize: 17, fontWeight: "bold" }}
                    >
                      Message Lawyer
                    </Text>
                  </TouchableOpacity>
                )}
              </View>

              <View
                style={{
                  width: "100%",
                  marginTop: 30,
                  borderBottomWidth: 1,
                  borderColor: "gainsboro",
                  borderStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                <View style={{ width: "100%", flexDirection: "row" }}>
                  <View
                    style={{
                      backgroundColor:
                        this.state.ticket?.status == 0
                          ? "tomato"
                          : this.state.ticket?.status == 6
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
                        fontSize: 16,
                      }}
                    >
                      {this.state.ticket?.status == 1
                        ? "Pending Review"
                        : this.state.ticket?.status == 0
                        ? "Cancelled"
                        : this.state.ticket?.status == 2
                        ? "Appearance Filed"
                        : this.state.ticket?.status == 3
                        ? "Hearing Scheduled"
                        : this.state.ticket?.status == 4
                        ? "Acceptance Required"
                        : this.state.ticket?.status == 5
                        ? "Driving Abstract Required"
                        : this.state.ticket?.status == 6
                        ? "Case Completed"
                        : null}
                    </Text>
                  </View>
                </View>

                <Text style={{ marginTop: 5, color: "gray", fontSize: 16 }}>
                  {this.state.ticket?.status == 1
                    ? "Your attorney is reviewing your case and will contact you shortly"
                    : this.state.ticket?.status == 0
                    ? "Your case has been cancelled"
                    : this.state.ticket?.status == 2
                    ? "Appearance Filed"
                    : this.state.ticket?.status == 3
                    ? "Hearing Scheduled"
                    : this.state.ticket?.status == 4
                    ? "Acceptance Required"
                    : this.state.ticket?.status == 5
                    ? "Driving Abstract Required"
                    : this.state.ticket?.status == 6
                    ? "Your case has been successfully completed"
                    : null}
                </Text>

                {this.state.ticket?.status == 0 ? null : (
                  <Text style={{ marginTop: 20, color: "gray", fontSize: 16 }}>
                    In the meantime, if you have any non-legal uestions about
                    your account or your case, please contact ticketdefense.
                  </Text>
                )}
              </View>

              {/* <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderColor: "gainsboro",
                  borderStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  Case Id
                </Text>
                <Text style={{ marginTop: 10, color: "gray", fontSize: 16 }}>
                  {this.state.ticket?.id}
                </Text>
              </View> */}

              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderColor: "gainsboro",
                  borderStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  Processed
                </Text>
                <Text style={{ marginTop: 10, color: "gray", fontSize: 16 }}>
                  {moment(this.state.ticket?.date).format("MMMM D, YYYY")}
                </Text>
              </View>

              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderColor: "gainsboro",
                  borderStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  State
                </Text>
                <Text style={{ marginTop: 10, color: "gray", fontSize: 16 }}>
                  {this.state.ticket?.violation?.state}
                </Text>
              </View>

              {/* <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderColor: "gainsboro",
                  borderStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  Violation
                </Text>
                <Text style={{ marginTop: 10, color: "gray", fontSize: 16 }}>
                  {this.state.ticket?.violation?.type}
                </Text>
              </View> */}

              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  borderBottomWidth: 1,
                  borderColor: "gainsboro",
                  borderStyle: "solid",
                  paddingBottom: 10,
                }}
              >
                <Text
                  style={{ color: "black", fontSize: 16, fontWeight: "bold" }}
                >
                  Points On License
                </Text>
                <Text style={{ marginTop: 10, color: "gray", fontSize: 16 }}>
                  {this.state.ticket?.violation?.points}
                </Text>
              </View>

              <View style={{ width: "100%", marginTop: 30 }}>
                <Text
                  style={{ fontSize: 22, color: "black", fontWeight: "bold" }}
                >
                  Description
                </Text>

                <View
                  style={{
                    width: "100%",
                    backgroundColor: "gainsboro",
                    paddingHorizontal: 15,
                    marginTop: 20,
                    paddingVertical: 10,
                    borderRadius: 10,
                  }}
                >
                  <Text style={{ color: "black", fontSize: 16 }}>
                    {this.state.ticket?.violation?.type}
                  </Text>
                </View>
              </View>

              {/* {this.state.ticket?.status == 0 ? null : (
                <TouchableOpacity
                  onPress={() => this.setState({ cancelModal: true })}
                  style={{
                    width: "100%",
                    height: 50,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "tomato",
                    borderRadius: 10,
                    marginTop: 40,
                  }}
                >
                  <Text
                    style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
                  >
                    Cancel case
                  </Text>
                </TouchableOpacity>
              )} */}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(TicketDetail);
