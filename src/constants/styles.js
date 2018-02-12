import { StyleSheet } from "react-native";

export const colors = {
  primary: "#dd2c00", // "#ff3d00",
  primary_dark: "#a30000", // "#c30000",
  primary_light: "#ff6434", // "#ff7539"
  primary_text: "white"
};

export const globalStyles = StyleSheet.create({
  flex1: {
    flex: 1
  },
  flexCenter: {
    justifyContent: "center",
    alignItems: "center"
  },
  primary_text: {
    color: colors.primary_text,
    fontWeight: "bold"
  }
});
