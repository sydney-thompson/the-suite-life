import { Platform } from "react-native";

import colors from "./colors";

export default {
  colors,
  text: {
    color: colors.white,
    fontSize: 20,
    fontFamily: Platform.OS === "android" ? "Roboto" : "Avenir",
  },
  title: {
    color: colors.black,
    fontSize: 40,
    fontFamily: Platform.OS === "android" ? "Roboto" : "AvenirNext-Bold",
    fontWeight: "bold",
  },
};
