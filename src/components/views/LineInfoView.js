import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

class LineInfoView extends Component {
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

LineInfoView.propTypes = {
  data: PropTypes.shape({
    cod: PropTypes.string,
    nome: PropTypes.string,
    obs: PropTypes.string,
    updated_at: PropTypes.string,
    tempo: PropTypes.string,
    preco: PropTypes.string
  }).isRequired
};

export default LineInfoView;
