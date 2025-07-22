import { Linking, Platform } from "react-native";
import ToastService from "./ToastService";

export const makePhoneCall = (phoneNumber) => {
  if (!phoneNumber) {
    console.error("No phone number provided");
    return;
  }

  const cleanedNumber = phoneNumber.replace(/[^\d+]/g, "");

  if (!cleanedNumber || cleanedNumber.length < 3) {
    console.error("Invalid phone number");
    return;
  }

  let phoneUrl;
  if (Platform.OS === "android") {
    phoneUrl = `tel:${cleanedNumber}`;
  } else {
    phoneUrl = `telprompt:${cleanedNumber}`;
  }

  Linking.canOpenURL(phoneUrl)
    .then((supported) => {
      if (!supported) {
        console.error("Phone calls are not supported on this device");
      } else {
        return Linking.openURL(phoneUrl);
      }
    })
    .catch((err) => console.error("An error occurred", err));
};

export const showCallInitiatedToast = (name) => {
  ToastService.showInfo("Calling", `Dialing ${name}...`);
};
