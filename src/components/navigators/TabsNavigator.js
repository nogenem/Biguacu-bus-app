import { StyleSheet, Dimensions } from "react-native";
import { TabNavigator } from "react-navigation";

import { colors } from "../../constants/styles";
import Home from "../../pages/Home";
import Search from "../../pages/Search";
import Update from "../../pages/Update";

const INITIAL_LAYOUT = {
  height: 0,
  width: Dimensions.get("window").width
};

const styles = StyleSheet.create({
  tab: {
    backgroundColor: colors.primary
  },
  tabIndicator: {
    backgroundColor: colors.primary_dark,
    height: 5
  }
});

export default TabNavigator(
  {
    Home: { screen: Home },
    Search: { screen: Search },
    Update: { screen: Update }
  },
  {
    tabBarPosition: "top",
    initialLayout: INITIAL_LAYOUT,
    tabBarOptions: {
      style: styles.tab,
      indicatorStyle: styles.tabIndicator
    }
  }
);
