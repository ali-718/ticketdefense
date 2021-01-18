import * as f from "firebase";
import NetInfo from "@react-native-community/netinfo";
import {
  stripePublishKey,
  stripeSecretKey,
  ToastError,
} from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const getLawyers = () => (dispatch) =>
  new Promise((resolve, reject) => {
    NetInfo.fetch().then((state) => {
      const lawyers = [];

      if (state.isConnected) {
        f.default
          .database()
          .ref("lawyers")
          .once("value")
          .then((res) => {
            res.forEach((item, i) => {
              lawyers.push({ ...item.val(), id: item.key });
            });
          })
          .then(() => {
            resolve(lawyers);
          })
          .catch((e) => {
            reject();
          });
      } else {
        ToastError("Network Error", "Kindly check your internet connection!");
        reject();
      }
    });
  });

export const setUSState = (state) => (dispatch) => {
  dispatch({ type: "SET_STATE", payload: state });
};

export const setImage = (state) => (dispatch) => {
  dispatch({ type: "SET_IMAGE", payload: state });
};

export const setViolationType = (violation) => (dispatch) => {
  dispatch({ type: "SET_VIOLATION_TYPE", payload: violation });
};

export const setLicensePoints = (points) => (dispatch) => {
  dispatch({ type: "SET_LICENSE_POINTS", payload: points });
};

export const setLawyer = (lawyer) => (dispatch) => {
  dispatch({ type: "SET_LAWYER", payload: lawyer });
};

export const getList = (id) => (dispatch) =>
  new Promise((resolve, reject) => {
    const list = [];
    NetInfo.fetch().then((net) => {
      if (net.isConnected) {
        f.default
          .database()
          .ref("list")
          .child(id)
          .once("value")
          .then((res) => {
            res.forEach((item, i) => {
              list.push({ ...item.val(), id: item.key });
            });
          })
          .then(() => {
            resolve(list);
          })
          .catch(() => {
            reject();
            ToastError("Error", "Some error occoured, please try again later");
          });
      } else {
        ToastError("Network Error", "Kindly check your internet connection!");
        reject();
      }
    });
  });

export const createToken = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    const { crediCardNumber, cvv, date, name, state } = data;
    NetInfo.fetch().then((net) => {
      if (net.isConnected) {
        axios
          .post(
            `https://api.stripe.com/v1/tokens?key=${stripePublishKey}&card[number]=${crediCardNumber}&card[cvc]=${cvv}&card[exp_month]=${date.slice(
              0,
              2
            )}&card[exp_year]=${date.slice(
              3,
              5
            )}&card[name]=${name}&card[address_state]=${state}`
          )
          .then((res) => {
            resolve(res.data);
          })
          .catch((e) => {
            if (e.message.includes("402")) {
              reject("Your card number is incorrect.");
            } else {
              reject("some error occoured, please try again later");
            }
          });
      } else {
        reject("Network Error", "Kindly check your internet connection!");
      }
    });
  });

export const createPayment = (token, amount) => (dispatch) =>
  new Promise((resolve, reject) => {
    NetInfo.fetch().then((net) => {
      if (net.isConnected) {
        axios
          .post(
            `https://api.stripe.com/v1/charges?source=${token}&key=${stripeSecretKey}&amount=${
              amount * 100
            }&currency=usd`
          )
          .then((res) => {
            resolve(res.data);
          })
          .catch(() => {
            reject("some error occoured, please try again later");
          });
      } else {
        reject("Network Error", "Kindly check your internet connection!");
      }
    });
  });

export const clearAll = () => (dispatch) => {
  dispatch({ type: "CLEAR_TICKET" });
};
