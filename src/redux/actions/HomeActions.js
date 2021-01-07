import * as f from "firebase";
import NetInfo from "@react-native-community/netinfo";
import { ToastError } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

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

        dispatch({ type: "GET_LAWYERS", payload: lawyers });
      } else {
        ToastError("Network Error", "Kindly check your internet connection!");
        reject();
      }
    });
  });

export const setUSState = (state) => (dispatch) => {
  dispatch({ type: "SET_STATE", payload: state });
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
