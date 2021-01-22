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
import image1 from "../../../assets/Partners/1.png";
import image2 from "../../../assets/Partners/2.png";
import image3 from "../../../assets/Partners/3.png";
import image4 from "../../../assets/Partners/4.png";
import image5 from "../../../assets/Partners/5.png";
import image6 from "../../../assets/Partners/6.png";
import image7 from "../../../assets/Partners/7.png";
import image8 from "../../../assets/Partners/8.png";
import image9 from "../../../assets/Partners/9.png";
import image10 from "../../../assets/Partners/10.png";
import image11 from "../../../assets/Partners/11.png";
import image12 from "../../../assets/Partners/12.png";
import image13 from "../../../assets/Partners/13.png";

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
          marginTop: 50,
          paddingBottom: 50,
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

  _renderLogos = ({ item, index }) => {
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
          <Image
            style={{ width: "100%", height: 100, resizeMode: "contain" }}
            source={item.image}
          />
        </View>
      </View>
    );
  };

  state = {
    entries: [
      {
        title: "Our Lawyers Fight Traffic Tickets!",
        message: `Avoid Points. Save Money. A single ticket can cost you thousands of dollars over time, from increased insurance premiums, court fines, surcharges, points, and court costs. Fight your ticket at an amazing, affordable, with the Lowest Rate In State Guaranteed!`,
      },
      {
        title: "Three Easy Steps!",
        message: `
        Create Your Profile
        Snap a Photo of your Ticket(s)
        Pick Your Lawyer`,
      },
      {
        title: "Trusted, Reliable, and Effective!",
        message: `Saves you time with no in-person appointments at a lawyer’s office. Rates are pre-negotiated to assure you have the most affordable rate. All lawyers are experienced in handling traffic tickets. 100% Money Back Guarantee Available. Easily communicate with your lawyer for status updates. Save thousands of dollars over time by having your lawyer fight your ticket, help you save points, and help you save on increased insurance costs over many years.`,
      },
    ],
    logos: [
      {
        image: image1,
      },
      {
        image: image2,
      },
      {
        image: image3,
      },
      {
        image: image4,
      },
      {
        image: image5,
      },
      {
        image: image6,
      },
      {
        image: image7,
      },
      {
        image: image8,
      },
      {
        image: image9,
      },
      {
        image: image10,
      },
      {
        image: image11,
      },
      {
        image: image12,
      },
      {
        image: image13,
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
              loop
            />
            <Pagination
              dotsLength={this.state.entries.length}
              activeDotIndex={this.state.activeIndex}
            />
            <Carousel
              onSnapToItem={(index) => this.setState({ activeIndex: index })}
              data={this.state.logos}
              renderItem={this._renderLogos}
              sliderWidth={WIDTH}
              itemWidth={WIDTH / 4}
              loop
              numColumns={4}
              style={{ height: 150 }}
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
