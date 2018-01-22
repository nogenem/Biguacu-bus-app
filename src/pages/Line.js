import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../constants/styles";

const getHeaderTitle = ({ nome, obs }) => (
  <View>
    <Text style={styles.headerTitle}>{nome}</Text>
    {obs && <Text style={styles.headerSubtitle}>({obs})</Text>}
  </View>
);

class Line extends PureComponent {
  static navigationOptions = props => ({
    headerTitle: getHeaderTitle(props.navigation.state.params),
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
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white"
  }
});

Line.propTypes = {
  // ownProps
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        cod: PropTypes.number,
        nome: PropTypes.string,
        obs: PropTypes.string
      }).isRequired
    }).isRequired
  }).isRequired
};

export default Line;
