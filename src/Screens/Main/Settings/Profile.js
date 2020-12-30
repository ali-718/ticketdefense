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
import { mapStateToProps, ToastError } from "../../../config/config";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";
import { LightGray, Pink } from "../../../config/Theme";
import Header from "../../../components/Header";

class Profile extends Component {
  state = {
    image:
      "https://journeypurebowlinggreen.com/wp-content/uploads/2018/05/placeholder-person.jpg",
    imageModal: false,
    imageLoading: false,
    TextEdit: false,
    Name: "",
    Description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s",
    Email: "",
    Company: "",
    Mobile: "",
    history: [],
    historyIsEmpty: false,
    historyLoading: true,
    frequency: false,
    showAlert: false,
    badge: "",
  };

  async componentDidMount() {
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestCameraRollPermissionsAsync();
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.CAMERA_ROLL);

    // const user = this.props.auth?.user;

    // this.setState({
    //   Name: user?.UserFullNm,
    //   Email: user?.UserEmail,
    //   Mobile: user?.UserMobNo,
    //   Company: "BizIntel",
    // });
  }

  openGallery = () => {
    this.setState({ imageModal: false });
    ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      aspect: [4, 5],
      allowsMultipleSelection: false,
    })
      .then((res) => {
        this.setState({ imageLoading: true });

        if (!res.cancelled) {
          const data = new FormData();
          data.append("photo", {
            name: "photo.png",
            filename: "imageName.png",
            type: "image/png",
            uri:
              Platform.OS === "android"
                ? res.uri
                : res.uri.replace("file://", ""),
          });
          data.append("Content-Type", "image/png");

          //   this.props
          //     .UploadProfileImg(this.props.auth?.user?.UserId, data)
          //     .then(() => {
          //       this.setState({ imageLoading: false });
          //     })
          //     .catch(() => {
          //       this.setState({ imageLoading: false });
          //     });
        }
      })
      .catch(() => {
        ToastError(
          "Error",
          "Unable to access your galley, provide permission from app settings"
        );
      });
  };

  openCamera = () => {
    this.setState({ imageModal: false });
    ImagePicker.launchCameraAsync({
      allowsEditing: true,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.5,
      aspect: [4, 5],
      allowsMultipleSelection: false,
    })
      .then((res) => {
        this.setState({ imageLoading: true });

        if (!res.cancelled) {
          const data = new FormData();
          data.append("photo", {
            name: "photo.png",
            filename: "imageName.png",
            type: "image/png",
            uri:
              Platform.OS === "android"
                ? res.uri
                : res.uri.replace("file://", ""),
          });
          data.append("Content-Type", "image/png");

          //   this.props
          //     .UploadProfileImg(this.props.auth?.user?.UserId, data)
          //     .then(() => {
          //       this.setState({ imageLoading: false });
          //     })
          //     .catch(() => {
          //       this.setState({ imageLoading: false });
          //     });
        } else {
          this.setState({ imageLoading: false });
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
    if (focus == "description") {
      this.descriptionInput.blur();

      setTimeout(() => {
        this.descriptionInput.focus();
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
    if (focus == "company") {
      this.companyInput.blur();

      setTimeout(() => {
        this.companyInput.focus();
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
  };

  updateProfile = () => {
    this.setState({ TextEdit: false });
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
            Company
          </Text>
          <TouchableOpacity onPress={() => this.FocusOnInput("company")}>
            <Text style={{ fontSize: 15, color: Pink }}>Edit</Text>
          </TouchableOpacity>
        </View>

        <TextInput
          ref={(e) => (this.companyInput = e)}
          editable={this.state.TextEdit}
          style={{
            fontSize: 17,
            color: "black",
            marginTop: 10,
            borderBottomWidth: 1,
            paddingBottom: 10,
            borderColor: "gainsboro",
          }}
          value={this.state.Company}
          onChangeText={(val) => this.setState({ Company: val })}
        ></TextInput>
      </View>
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
                    backgroundColor: Pink,
                    borderRadius: 100,
                  }}
                >
                  <Image
                    style={{ width: 120, height: 120, borderRadius: 100 }}
                    source={
                      user?.ProfPicPath
                        ? { uri: user?.ProfPicPath }
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

export default Profile;
