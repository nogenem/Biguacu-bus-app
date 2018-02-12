import React, { Component } from "react";
import { Provider } from "react-redux";
import { StatusBar, View } from "react-native";

import { colors, globalStyles } from "./constants/styles";
import store from "./store";
import App from "./App";
import DBManager from "./database/DBManager";

class Main extends Component {
  componentWillMount() {
    DBManager.loadDB();
  }

  render() {
    return (
      <Provider store={store}>
        <View style={globalStyles.flex1}>
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

export default Main;
