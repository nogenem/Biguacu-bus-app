import React, { PureComponent } from "react";
import { View, Text } from "react-native";

class Home extends PureComponent {
  componentDidMount() {
    // load departures, if not loaded yet (!store.departures.isEmpty())
    // load data of default departure, if not loaded yet (!store.status["default departure"])
    // verificar se component eh dismontado quando muda de aba!!
    // verificar oq acontece com a store quando o app eh 'minimizado'
  }

  render() {
    return (
      <View>
        <Text>Home</Text>
      </View>
    );
  }
}

export default Home;
