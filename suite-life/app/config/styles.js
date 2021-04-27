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
  cardContainer: {
    backgroundColor: colors.primary,
    borderRadius: 20,
    padding: 15,
    width: "95%",
    margin: "2%",
  },
  cardText: {
    marginBottom: 10,
    fontSize: 30,
    fontWeight: "600",
  },
  clearedContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  clearedText: {
    color: colors.light,
    fontSize: 25,
    fontWeight: "600",
  },
  headerContainer: {
    paddingTop: 10,
    alignItems: "center",
    backgroundColor: colors.secondary,
    flex: 0,
    height: "11%",
    justifyContent: "center",
  },
  headerText: {
    color: colors.white,
    fontWeight: "500",
    fontSize: 50,
  },
  listContainer: {
    width: "100%",
  },
};
