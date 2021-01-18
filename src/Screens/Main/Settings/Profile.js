import {
  Container,
  Content,
  Tab,
  Tabs,
  Icon,
  ListItem,
  Left,
  Body,
  Right,
  Button,
  Switch,
} from "native-base";
import React, { Component } from "react";
import {
  ActivityIndicator,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { connect } from "react-redux";
import {
  mapStateToProps,
  ToastError,
  ToastSuccess,
} from "../../../config/config";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { LightGray, Pink } from "../../../config/Theme";
import Header from "../../../components/Header";
import DatePicker from "react-native-datepicker";
import * as f from "firebase";
import { fetch } from "@react-native-community/netinfo";
import { updateImage, update } from "../../../redux/actions/AuthActions";
import validator from "validator";

class Profile extends Component {
  state = {
    image: "",
    imageModal: false,
    imageLoading: false,
    TextEdit: false,
    Name: "",
    Email: "",
    Company: "",
    Mobile: "",
    history: [],
    historyIsEmpty: false,
    historyLoading: true,
    frequency: false,
    showAlert: false,
    badge: "",
    testImage: "",
    Address: "",
    dob: "",
    gender: "",
    isLoading: false,
    ProfileImage: "",
  };

  async componentDidMount() {
    const user = this.props.auth.user;

    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.MEDIA_LIBRARY);

    this.setState({
      Name: user.Name,
      Email: user.Email,
      Mobile: user.Phone,
      Address: user.address,
      ProfileImage:
        user.image?.length > 0 ? user.image : this.state.ProfileImage,
      dob: user.dob,
    });
  }

  openCamera = () => {
    this.setState({ imageModal: false });
    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.1,
      aspect: [4, 5],
      allowsMultipleSelection: false,
    })
      .then(async (res) => {
        this.setState({ imageLoading: true });

        if (!res.cancelled) {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", res.uri, true);
            xhr.send(null);
          });

          f.default
            .storage()
            .ref("profile")
            .child("users")
            .child(this.uniqueId())
            .put(blob)
            .then(async (res) => {
              this.setState({
                imageLoading: false,
                ProfileImage: await res.ref.getDownloadURL(),
                TextEdit: true,
              });
              blob.close();
            })
            .catch((e) => {
              ToastError(
                "Error!",
                "Some error occoured, please try again later"
              );
              this.setState({ imageLoading: false, TextEdit: false });
              console.log(e);
            });
        } else {
          this.setState({ imageLoading: false, ProfileImage: "" });
        }
      })
      .catch(() => {
        ToastError(
          "Error",
          "Unable to access your camera, provide permission from app settings"
        );
        this.setState({ imageLoading: false });
      });
  };

  FocusOnInput = (focus) => {
    this.setState({ TextEdit: true });

    if (focus == "email") {
      this.emailInput.blur();

      setTimeout(() => {
        this.emailInput.focus();
      }, 100);
      return;
    }

    if (focus == "name") {
      this.nameInput.blur();

      setTimeout(() => {
        this.nameInput.focus();
      }, 100);
      return;
    }
    if (focus == "address") {
      this.addressInput.blur();

      setTimeout(() => {
        this.addressInput.focus();
      }, 100);
      return;
    }
    if (focus == "mobile") {
      this.mobileInput.blur();

      setTimeout(() => {
        this.mobileInput.focus();
      }, 100);
      return;
    }
    if (focus == "dob") {
      this.ticketDatePicker.onPressDate();

      this.setState({ TextEdit: true });
      return;
    }
  };

  updateProfile = () => {
    this.setState({ TextEdit: false });
    const { Name, Email, Mobile, Address, dob, ProfileImage } = this.state;

    if (
      validator.isEmpty(Name) ||
      validator.isEmpty(Email) ||
      validator.isEmpty(Mobile)
    ) {
      alert("Name, Email and Mobile cannot be empty");
      return;
    }
    if (!validator.isEmail(Email)) {
      alert("Email format is incorrect");
      return;
    }
    if (!validator.isNumeric(Mobile)) {
      alert("Mobile can only contain numbers");
      return;
    }

    this.setState({ isLoading: true });

    this.props
      .update({
        Name,
        Email,
        Phone: Mobile,
        address: Address,
        dob,
        id: this.props.auth.user.id,
        image: ProfileImage,
      })
      .then(() => {
        this.setState({ isLoading: false });
        ToastSuccess("Success", "Profile updated succesfully");
      })
      .catch(() => {
        this.setState({ isLoading: false });
      });
  };

  s4 = () => {
    return Math.floor((1 + Math.random()) * 0x1000)
      .toString(16)
      .substring(1);
  };

  uniqueId = () => {
    return (
      this.s4() +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4() +
      "-" +
      this.s4()
    );
  };

  openGallery = () => {
    this.setState({ imageModal: false });
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      aspect: [4, 5],
      allowsMultipleSelection: false,
    })
      .then(async (res) => {
        this.setState({ imageLoading: true });

        if (!res.cancelled) {
          const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
              resolve(xhr.response);
            };
            xhr.onerror = function (e) {
              console.log(e);
              reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", res.uri, true);
            xhr.send(null);
          });

          f.default
            .storage()
            .ref("profile")
            .child("users")
            .child(this.uniqueId())
            .put(blob)
            .then(async (res) => {
              this.setState({
                imageLoading: false,
                ProfileImage: await res.ref.getDownloadURL(),
                TextEdit: true,
              });
              blob.close();
            })
            .catch((e) => {
              ToastError(
                "Error!",
                "Some error occoured, please try again later"
              );
              this.setState({ imageLoading: false, TextEdit: false });
              console.log(e);
            });
        } else {
          this.setState({ imageLoading: false, ProfileImage: "" });
        }
      })
      .catch(() => {
        ToastError(
          "Error",
          "Unable to access your galley, provide permission from app settings"
        );
      });
  };

  _renderAbout = () => (
    <View style={{ width: "100%", flex: 1, paddingBottom: 30 }}>
      <View style={{ width: "100%", marginTop: 30 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}>
            Name
          </Text>
          <TouchableOpacity onPress={() => this.FocusOnInput("name")}>
            <Text style={{ fontSize: 15, color: Pink }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          ref={(e) => (this.nameInput = e)}
          editable={this.state.TextEdit}
          style={{
            fontSize: 17,
            color: "black",
            marginTop: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: "gainsboro",
          }}
          value={this.state.Name}
          onChangeText={(val) => this.setState({ Name: val })}
        ></TextInput>
      </View>

      <View style={{ width: "100%", marginTop: 30 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}>
            Email
          </Text>
          <TouchableOpacity onPress={() => this.FocusOnInput("email")}>
            <Text style={{ fontSize: 15, color: Pink }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          ref={(e) => (this.emailInput = e)}
          editable={this.state.TextEdit}
          style={{
            fontSize: 17,
            color: "black",
            marginTop: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: "gainsboro",
          }}
          keyboardType="email-address"
          value={this.state.Email}
          onChangeText={(val) => this.setState({ Email: val })}
        ></TextInput>
      </View>

      <View style={{ width: "100%", marginTop: 30 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}>
            Mobile
          </Text>
          <TouchableOpacity onPress={() => this.FocusOnInput("mobile")}>
            <Text style={{ fontSize: 15, color: Pink }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          ref={(e) => (this.mobileInput = e)}
          editable={this.state.TextEdit}
          style={{
            fontSize: 17,
            color: "black",
            marginTop: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: "gainsboro",
          }}
          keyboardType="numeric"
          value={this.state.Mobile}
          onChangeText={(val) => this.setState({ Mobile: val })}
        ></TextInput>
      </View>

      <View style={{ width: "100%", marginTop: 30 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}>
            Address
          </Text>
          <TouchableOpacity onPress={() => this.FocusOnInput("address")}>
            <Text style={{ fontSize: 15, color: Pink }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          ref={(e) => (this.addressInput = e)}
          editable={this.state.TextEdit}
          style={{
            fontSize: 17,
            color: "black",
            marginTop: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: "gainsboro",
          }}
          value={this.state.Address}
          onChangeText={(val) => this.setState({ Address: val })}
        ></TextInput>
      </View>

      <View style={{ width: "100%", marginTop: 30 }}>
        <View
          style={{
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, color: "gray", fontWeight: "bold" }}>
            Date of Birth
          </Text>
          <TouchableOpacity onPress={() => this.FocusOnInput("dob")}>
            <Text style={{ fontSize: 15, color: Pink }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => this.ticketDatePicker.onPressDate()}
          style={{
            fontSize: 17,
            color: "black",
            marginTop: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: "gainsboro",
            paddingTop: this.state.dob ? 5 : 10,
          }}
        >
          <Text style={{ color: "black", fontSize: 17 }}>{this.state.dob}</Text>
        </TouchableOpacity>
      </View>
      <DatePicker
        ref={(e) => (this.ticketDatePicker = e)}
        style={{ width: 200, opacity: 0 }}
        date={this.state.dob}
        mode="date"
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        showIcon={false}
        onDateChange={(date) => {
          console.log(date);
          this.setState({ dob: date });
        }}
      />
    </View>
  );

  render() {
    const user = this.props?.auth?.user;
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
        <Header navigation={this.props.navigation} />

        <Modal
          animationType="slide"
          transparent
          onRequestClose={() => null}
          visible={this.state.isLoading}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(0,0,0,0)",
            }}
          >
            <ActivityIndicator size="large" color={Pink} />
          </View>
        </Modal>

        <Modal
          visible={this.state.imageModal}
          transparent
          animated
          animationType="slide"
          onRequestClose={() => this.setState({ imageModal: false })}
        >
          <View
            style={{
              width: "100%",
              flex: 1,
              justifyContent: "flex-end",
              alignItems: "center",
              backgroundColor: "rgba(0,0,0,0.5)",
            }}
          >
            <View
              style={{
                width: "100%",
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                backgroundColor: "white",
                padding: 20,
              }}
            >
              <TouchableOpacity
                onPress={() => this.setState({ imageModal: false })}
              >
                <Text
                  style={{ color: "tomato", textDecorationLine: "underline" }}
                >
                  cancel
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  width: "100%",
                  marginTop: 20,
                  flexDirection: "row",
                  height: 100,
                  marginBottom: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    width: "50%",
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => this.openCamera()}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../../../../assets/camera.png")}
                  />
                  <Text
                    style={{ fontSize: 13, fontWeight: "bold", marginTop: 10 }}
                  >
                    CAMERA
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    width: "50%",
                    height: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() => this.openGallery()}
                >
                  <Image
                    style={{ width: 60, height: 60 }}
                    source={require("../../../../assets/gallery.png")}
                  />
                  <Text
                    style={{ fontSize: 13, fontWeight: "bold", marginTop: 10 }}
                  >
                    GALLERY
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <View
          style={{ width: "90%", alignSelf: "center", marginTop: 10, flex: 1 }}
        >
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={{ width: "100%" }}
          >
            <View
              style={{
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                marginTop: 30,
              }}
            >
              {this.state.imageLoading ? (
                <ActivityIndicator size="large" color={Pink} />
              ) : (
                <TouchableOpacity
                  onPress={() => this.setState({ imageModal: true })}
                  style={{
                    padding: 5,
                    borderRadius: 100,
                  }}
                >
                  <Image
                    style={{ width: 120, height: 120, borderRadius: 100 }}
                    source={
                      this.state.ProfileImage.length > 0
                        ? { uri: this.state.ProfileImage }
                        : require("../../../../assets/user.png")
                    }
                  />
                  <View
                    style={{
                      alignItems: "flex-end",
                      justifyContent: "center",
                      position: "absolute",
                      zIndex: 1,
                      width: 145,
                      height: 120,
                    }}
                  >
                    <View
                      style={{
                        width: 40,
                        height: 40,
                        backgroundColor: "rgba(0, 230, 64, 0.5)",
                        borderRadius: 100,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Icon
                        name="camera"
                        type="EvilIcons"
                        style={{ color: "white", fontSize: 25 }}
                      />
                    </View>
                  </View>
                </TouchableOpacity>
              )}
            </View>

            <View
              style={{ width: "100%", alignItems: "center", marginTop: 20 }}
            >
              <Text
                style={{
                  fontSize: 35,
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                {user?.UserFullNm}
              </Text>

              {this._renderAbout()}
            </View>
          </ScrollView>
        </View>
        {this.state.TextEdit ? (
          <View
            style={{
              width: "100%",
              paddingVertical: 10,
              alignItems: "center",
              justifyContent: "center",
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.27,
              shadowRadius: 4.65,

              elevation: 6,
              borderTopLeftRadius: 20,
              borderTopRightRadius: 20,
              marginBottom: 0,
              backgroundColor: "white",
              paddingBottom: 20,
            }}
          >
            <TouchableOpacity
              onPress={() => this.updateProfile()}
              style={{
                width: "90%",
                padding: 12,
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: Pink,
                borderRadius: 10,
                marginTop: 20,
              }}
            >
              <Text style={{ color: "white" }}>Update</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => this.setState({ TextEdit: false })}
              style={{ marginTop: 10 }}
            >
              <Text
                style={{ color: "tomato", textDecorationLine: "underline" }}
              >
                cancel
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
      </SafeAreaView>
    );
  }
}

export default connect(mapStateToProps, { updateImage, update })(Profile);
