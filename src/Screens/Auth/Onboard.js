import React, { Component } from "react";
import {
  Image,
  SafeAreaView,
  StatusBar,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import Carousel, { Pagination } from "react-native-snap-carousel";
import { Blue } from "../../config/Theme";

const WIDTH = Dimensions.get("window").width;

export default class Onboard extends Component {
  _renderItem = ({ item, index }) => {
    return (
      <View
        style={{
          width: "100%",
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={{ width: "90%" }}>
          <View style={{ width: "100%" }}>
            <Text style={{ color: "black", fontSize: 20, fontWeight: "bold" }}>
              {item.title}
            </Text>
          </View>
          <Text style={{ color: "gray", fontSize: 15, marginTop: 10 }}>
            {item.message}
          </Text>
        </View>
      </View>
    );
  };

  state = {
    entries: [
      {
        title: "How to :",
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      },
      {
        title: "How to :",
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      },
      {
        title: "How to :",
        message:
          "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged",
      },
    ],
    activeIndex: 0,
  };

  render() {
    return (
      <SafeAreaView
        style={{
          width: "100%",
          flex: 1,
          paddingTop: StatusBar.currentHeight,
          backgroundColor: "white",
        }}
      >
        <View style={{ width: "100%", flex: 1 }}>
          <View style={{ width: "100%", height: 180 }}>
            <Image
              style={{ width: "100%", height: 180 }}
              source={require("../../../assets/upper.png")}
            />
          </View>
          <View
            style={{
              width: "100%",
              flex: 1,
              //   backgroundColor: "red",
              zIndex: 99,
            }}
          >
            <Carousel
              ref={(c) => {
                this._carousel = c;
              }}
              onSnapToItem={(index) => this.setState({ activeIndex: index })}
              data={this.state.entries}
              renderItem={this._renderItem}
              sliderWidth={WIDTH}
              itemWidth={WIDTH}
            />
            <Pagination
              dotsLength={3}
              activeDotIndex={this.state.activeIndex}
            />
          </View>
          <View
            style={{
              width: "100%",
              height: 100,
              justifyContent: "flex-end",
              //   overflow: "hidden",
            }}
          >
            <Image
              style={{ width: "100%", height: 130, resizeMode: "stretch" }}
              source={require("../../../assets/lower.png")}
            />
            <View
              style={{
                width: "100%",
                height: 70,
                position: "absolute",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  paddingHorizontal: 20,
                }}
              >
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    backgroundColor: "white",
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("login", { login: true })
                  }
                >
                  <Text style={{ color: Blue, fontWeight: "bold" }}>LOGIN</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 30,
                    backgroundColor: "white",
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onPress={() =>
                    this.props.navigation.navigate("login", { login: false })
                  }
                >
                  <Text style={{ color: Blue, fontWeight: "bold" }}>
                    SIGNUP
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}
