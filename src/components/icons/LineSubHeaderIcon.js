import React from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const arrows = ["arrow-forward", "arrow-back"];

const LineSubHeaderIcon = ({ index, onPress }) => (
  <TouchableOpacity onPress={onPress} style={styles.container}>
    <Icon name={arrows[index]} size={30} color="white" />
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    marginRight: 10,
    alignItems: "flex-end"
  }
});

LineSubHeaderIcon.propTypes = {
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired
};

export default LineSubHeaderIcon;
