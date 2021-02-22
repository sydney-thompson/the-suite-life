import { DefaultTheme } from "@react-navigation/native";
import colors from "../config/colors";

export default {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: colors.tertiary,
    background: colors.black,
    card: colors.black,
    text: colors.white,
    border: colors.white,
  },
};
