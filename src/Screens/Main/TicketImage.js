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
} from "react-native";
import Header from "../../components/Header";
import { Pink } from "../../config/Theme";
import * as ImagePicker from "expo-image-picker";
import * as Permissions from "expo-permissions";

export default class TicketImage extends Component {
  state = {
    imageModal: false,
  };

  async componentDidMount() {
    await ImagePicker.requestCameraPermissionsAsync();
    await ImagePicker.requestMediaLibraryPermissionsAsync();
    await Permissions.askAsync(Permissions.CAMERA);
    await Permissions.askAsync(Permissions.MEDIA_LIBRARY);
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

          // this.props
          //   .UploadProfileImg(this.props.auth?.user?.UserId, data)
          //   .then(() => {
          //     this.setState({ imageLoading: false });
          //   })
          //   .catch(() => {
          //     this.setState({ imageLoading: false });
          //   });
        }
      })
      .catch(() => {
        Alert.alert(
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

          // this.props
          //   .UploadProfileImg(this.props.auth?.user?.UserId, data)
          //   .then(() => {
          //     this.setState({ imageLoading: false });
          //   })
          //   .catch(() => {
          //     this.setState({ imageLoading: false });
          //   });
        } else {
          this.setState({ imageLoading: false });
        }
      })
      .catch(() => {
        Alert.alert(
          "Error",
          "Unable to access your camera, provide permission from app settings"
        );
        this.setState({ imageLoading: false });
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
                    source={require("../../../assets/camera.png")}
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
                    source={require("../../../assets/gallery.png")}
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
        <Header navigation={this.props.navigation} />

        <View
          style={{
            width: "90%",
            flex: 1,
            alignItems: "center",
            marginTop: 20,
            justifyContent: "space-between",
          }}
        >
          <View style={{ width: "100%" }}>
            <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
              Start a new case
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
              For the most accurate quote, upload a photo of your ticket or
              court appearance notice
            </Text>
          </View>

          <View style={{ width: "100%", alignItems: "center" }}>
            <Image
              style={{ width: 150, height: 150 }}
              source={require("../../../assets/ticket.png")}
            />
          </View>

          <View
            style={{ width: "100%", marginBottom: 30, alignItems: "center" }}
          >
            <TouchableOpacity
              onPress={() => this.setState({ imageModal: true })}
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
                Take a photo of your ticket
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                this.props.navigation.navigate("NumberOfViolations")
              }
              style={{ marginTop: 15 }}
            >
              <Text
                style={{
                  fontSize: 15,
                  fontWeight: "bold",
                  color: Pink,
                  textAlign: "center",
                  width: "100%",
                }}
              >
                I'll provide one later
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
