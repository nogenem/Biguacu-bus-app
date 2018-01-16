import React, { Component } from "react";
import { Provider } from "react-redux";
import { StatusBar, View, StyleSheet } from "react-native";

import { colors } from "./constants/styles";
import store from "./store";
import App from "./App";

import DBManager from "./utils/DBManager";

class Main extends Component {
  componentWillMount() {
    DBManager.loadDB();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <StatusBar
            backgroundColor={colors.primary}
            barStyle="light-content"
          />
          <App />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

export default Main;
