import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../constants/styles";

class Line extends PureComponent {
  static navigationOptions = props => ({
    // apenas exemplo
    headerTitle: (
      <Text style={styles.headerTitle}>
        Linha {props.navigation.state.params.cod}
      </Text>
    ),
    headerBackTitle: "Voltar",
    headerBackTitleStyle: { color: "white" },
    headerTintColor: "white",
    headerStyle: { backgroundColor: colors.primary }
  });

  render() {
    return (
      <View>
        <Text>Line {this.props.navigation.state.params.cod}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white"
  }
});

Line.propTypes = {
  // ownProps
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        cod: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired
};

export default Line;
