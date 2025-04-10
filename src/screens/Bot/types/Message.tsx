import { FirebaseAuthTypes } from "@react-native-firebase/auth";

export type Message = {
  id?: string,
  message: string;
  sender?: FirebaseAuthTypes.User;
  loading?: boolean;
};
