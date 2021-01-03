import * as f from "firebase";
import NetInfo from "@react-native-community/netinfo";
import { ToastError } from "../../config/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const Signup = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    const { Name, Email, Password, Phone } = data;

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        f.default
          .auth()
          .createUserWithEmailAndPassword(Email, Password)
          .then((res) => {
            f.default
              .database()
              .ref(`users/${res.user.uid}`)
              .set(data)
              .then(() => {
                dispatch({
                  type: "USER",
                  payload: { ...data, id: res.user.uid },
                });
                saveUser({ ...data, id: res.user.uid });
                resolve();
              })
              .catch((e) => {
                reject();
                ToastError("Error", e.message);
              });
          })
          .catch((e) => {
            reject();
            ToastError("Error", e.message);
          });
      } else {
        ToastError("Network Error", "Kindly check your internet connection!");
        reject();
      }
    });
  });

export const SignIn = (data) => (dispatch) =>
  new Promise((resolve, reject) => {
    const { Email, Password } = data;

    NetInfo.fetch().then((state) => {
      if (state.isConnected) {
        f.default
          .auth()
          .signInWithEmailAndPassword(Email, Password)
          .then((res) => {
            f.default
              .database()
              .ref(`users/${res.user.uid}`)
              .once("value")
              .then((user) => {
                dispatch({
                  type: "USER",
                  payload: { ...user.val(), id: user.key },
                });
                saveUser({ ...user.val(), id: user.key });
                resolve();
              })
              .catch((e) => {
                reject();
                ToastError("Error", e.message);
              });
          })
          .catch((e) => {
            reject();
            ToastError("Error", e.message);
          });
      } else {
        ToastError("Network Error", "Kindly check your internet connection!");
        reject();
      }
    });
  });

const saveUser = (data) => {
  AsyncStorage.setItem("user", JSON.stringify(data));
};

export const removeUser = () => (dispatch) => {
  AsyncStorage.removeItem("user");

  dispatch({ type: "LOGOUT" });
};

export const fetchUser = () => (dispatch) =>
  new Promise(async (resolve, reject) => {
    const user = await AsyncStorage.getItem("user");

    console.log(user);

    if (user != null) {
      dispatch({ type: "USER", payload: JSON.parse(user) });
      resolve();

      return;
    }

    reject();
  });
