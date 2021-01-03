import React, { Component } from "react";
import { Provider } from "react-redux";
import Router from "./Router";
import store from "./store";
import Toast from "react-native-toast-message";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router />
        <Toast ref={(ref) => Toast.setRef(ref)} />
      </Provider>
    );
  }
}
