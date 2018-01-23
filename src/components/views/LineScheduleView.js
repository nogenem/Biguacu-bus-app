import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

class LineScheduleView extends Component {
  render() {
    return <View style={styles.container} />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

LineScheduleView.propTypes = {
  data: PropTypes.shape({
    saida: PropTypes.string
  }).isRequired
};

export default LineScheduleView;
