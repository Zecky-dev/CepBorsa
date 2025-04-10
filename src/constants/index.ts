import { Platform } from "react-native";
import DeviceInfo from "react-native-device-info";

const PORT = 3000;

const createBaseURL = () => {
  const isDev = __DEV__;
  const isEmulator = DeviceInfo.isEmulatorSync();
  const isAndroid = Platform.OS === "android";

  if(!isDev) {
    return "https://cepborsabackend.onrender.com/api"    
  }
  else {
    if(isEmulator) {
      return `http://${isAndroid ? "10.0.2.2" : "localhost"}:${PORT}/api`
    }
    else {
      return "https://cepborsabackend.onrender.com/api"
    }
  }
}

const BASE_URL = createBaseURL();

export { BASE_URL }