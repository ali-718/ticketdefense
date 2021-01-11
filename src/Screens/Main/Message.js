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
import { mapStateToProps } from "../../config/config";
import { Pink } from "../../config/Theme";
import { getLawyers, setLawyer } from "../../redux/actions/HomeActions";

export default class Message extends Component {
  componentDidMount() {}

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
        <View style={{ width: "100%", flex: 1 }}>
          <ScrollView
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
              <View style={{ width: "100%" }}>
                <View
                  style={{
                    maxWidth: "50%",
                    alignSelf: "flex-start",
                    backgroundColor: Pink,
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>
                    Hello firends my name is ali haider
                  </Text>
                </View>
                <View
                  style={{
                    maxWidth: "50%",
                    alignSelf: "flex-end",
                    backgroundColor: Pink,
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>
                    Hello firends my name is ali haider
                  </Text>
                </View>

                <View
                  style={{
                    maxWidth: "50%",
                    alignSelf: "flex-start",
                    backgroundColor: Pink,
                    padding: 10,
                    borderRadius: 10,
                    marginTop: 10,
                  }}
                >
                  <Text style={{ color: "white" }}>Hello</Text>
                </View>
              </View>
            </View>
          </ScrollView>
          <View
            style={{
              width: "100%",
              height: 50,
              flexDirection: "row",
              paddingHorizontal: 10,
            }}
          >
            <TextInput
              style={{
                flex: 1,
                height: 40,
                paddingLeft: 10,
                borderStyle: "solid",
                borderColor: "gray",
                borderWidth: 0.5,
                borderRadius: 10,
              }}
              placeholder="Message...!"
            />
            <TouchableOpacity
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
        </View>
      </SafeAreaView>
    );
  }
}
