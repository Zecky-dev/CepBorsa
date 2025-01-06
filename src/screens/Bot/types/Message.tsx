import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type Message = {
  message: string;
  sender?: FirebaseAuthTypes.User;
};
