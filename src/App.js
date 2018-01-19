import React from "react";
import { StyleSheet, Dimensions } from "react-native";
import { TabViewAnimated, TabBar, SceneMap } from "react-native-tab-view";

import { colors } from "./constants/styles";
import Home from "./pages/Home";
import Search from "./pages/Search";
import Update from "./pages/Update";

const INITIAL_LAYOUT = {
  height: 0,
  width: Dimensions.get("window").width
};

class App extends React.PureComponent {
  state = {
    index: 0,
    routes: [
      { key: "1", title: "Home" },
      { key: "2", title: "Search" },
      { key: "3", title: "Update" }
    ]
  };

  handleIndexChange = index => this.setState({ index });

  renderHeader = props => (
    <TabBar
      {...props}
      style={styles.tab}
      indicatorStyle={styles.tabIndicator}
    />
  );

  renderScene = ({ route }) => {
    switch (route.key) {
      case "1":
        return <Home isVisible={this.state.index === 0} />;
      case "2":
        return <Search isVisible={this.state.index === 1} />;
      case "3":
        return <Update isVisible={this.state.index === 2} />;
      default:
        return null;
    }
  };

  render() {
    return (
      <TabViewAnimated
        style={styles.container}
        navigationState={this.state}
        renderScene={this.renderScene}
        renderHeader={this.renderHeader}
        onIndexChange={this.handleIndexChange}
        index={this.state.index}
        routes={this.state.routes}
        initialLayout={INITIAL_LAYOUT}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tab: {
    backgroundColor: colors.primary
  },
  tabIndicator: {
    backgroundColor: colors.primary_dark,
    height: 5
  }
});

export default App;
