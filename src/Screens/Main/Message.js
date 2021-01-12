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
import { mapStateToProps, ToastError } from "../../config/config";
import { Pink } from "../../config/Theme";
import { getLawyers, setLawyer } from "../../redux/actions/HomeActions";
import * as f from "firebase";
import moment from "moment";
import NetInfo from "@react-native-community/netinfo";

class Message extends Component {
  state = {
    data: {},
    currentUser: "",
    reciever: "",
    message: "",
    chats: [],
    loading: true,
    error: false,
  };

  componentDidMount() {
    this.props.navigation.addListener("focus", () => {
      const data = this.props.route.params.data;

      this.setState(
        {
          data,
          currentUser: this.props.auth?.user?.id,
          reciever: data.lawyer?.id,
        },
        () => {
          this.fetchMessages(this.state.data.id);
        }
      );
    });
  }

  fetchMessages = () => {
    this.setState({ loading: true, error: false });

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        f.default
          .database()
          .ref("chats")
          .child(this.state.data.id)
          .on(
            "value",
            (res) => {
              console.log(Object.values(res.val()));
              // res.forEach((data) => {
              //   this.setState((prevState) => ({
              //     chats: [...prevState.chats, { ...data.val(), id: data.key }],
              //   }));
              // });

              this.setState({ chats: Object.values(res.val()) });

              this.setState({ loading: false, error: false });
            },
            () => {
              this.setState({ loading: false, error: true });
            }
          );
      } else {
        this.setState({ loading: false, error: true });
        ToastError("Network Error!", "Kindly check your internet connection");
      }
    });
  };

  sendMessage = () => {
    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        f.default
          .database()
          .ref("chats")
          .child(this.state.data.id)
          .push({
            sender: this.state.currentUser,
            reciever: this.state.reciever,
            message: this.state.message,
            date: moment().format(),
          })
          .then(() => {
            this.setState({ message: "" });
            this.scroll.scrollToEnd({ animated: true });
          })
          .catch(() => {
            ToastError("Error", "Unable to send the message...!");
          });
      } else {
        ToastError("Network Error!", "Kindly check your internet connection");
      }
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
        }}
      >
        <Header navigation={this.props.navigation} />
        <View style={{ width: "100%", flex: 1, paddingTop: 10 }}>
          {this.state.chats.length > 0 ? (
            <>
              <ScrollView
                ref={(e) => (this.scroll = e)}
                showsVerticalScrollIndicator={false}
                style={{ width: "100%", flex: 1 }}
              >
                <View
                  style={{
                    width: "100%",
                    flex: 1,
                    backgroundColor: "white",
                    paddingHorizontal: 10,
                  }}
                >
                  {this.state.chats.map((item, i) => (
                    <View
                      key={i}
                      style={{
                        maxWidth: "60%",
                        alignSelf:
                          item.sender == this.state.currentUser
                            ? "flex-end"
                            : "flex-start",
                        backgroundColor: Pink,
                        padding: 10,
                        borderRadius: 10,
                        marginTop: 10,
                      }}
                    >
                      <Text style={{ color: "white" }}>{item.message}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
              <View
                style={{
                  width: "100%",
                  height: 60,
                  flexDirection: "row",
                  paddingHorizontal: 10,
                  alignItems: "center",
                }}
              >
                <TextInput
                  value={this.state.message}
                  onChangeText={(val) => this.setState({ message: val })}
                  style={{
                    flex: 1,
                    height: 40,
                    paddingLeft: 10,
                    borderStyle: "solid",
                    borderColor: "gray",
                    borderWidth: 0.5,
                    borderRadius: 10,
                    paddingRight: 5,
                  }}
                  placeholder="Message...!"
                />
                <TouchableOpacity
                  onPress={() => this.sendMessage()}
                  disabled={this.state.message.length == 0 ? true : false}
                  style={{
                    width: 40,
                    height: 40,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: Pink,
                    borderRadius: 100,
                    marginLeft: 10,
                  }}
                >
                  <Icon
                    name="send"
                    type="Ionicons"
                    style={{ color: "white", fontSize: 20 }}
                  />
                </TouchableOpacity>
              </View>
            </>
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
                onPress={() => this.fetchMessages()}
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
              <Text style={{ fontSize: 18 }}>
                Start your conversation with lawyer...!
              </Text>
            </View>
          )}
        </View>
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps)(Message);
