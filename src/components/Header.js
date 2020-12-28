import { Icon } from "native-base";
import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class Header extends Component {
  render() {
    return (
      <View
        style={{
          width: "100%",
          height: 40,
          justifyContent: "center",
          paddingHorizontal: 15,
        }}
      >
        <TouchableOpacity
          onPress={() => this.props.navigation.goBack()}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Icon
            name="arrow-back-ios"
            type="MaterialIcons"
            style={{ fontSize: 20 }}
          />
          <Text style={{ marginLeft: 0, fontSize: 15 }}>Back</Text>
        </TouchableOpacity>
      </View>
    );
  }
}
