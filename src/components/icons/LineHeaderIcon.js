import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

class LineHeaderIcon extends PureComponent {
  onPress = () => {
    const { setParams, mode } = this.props;
    setParams({ mode: mode === "info" ? "schedule" : "info" });
  };

  render() {
    return (
      <TouchableOpacity onPress={this.onPress} style={styles.container}>
        <Icon name={this.props.mode} size={30} color="white" />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 10
  }
});

LineHeaderIcon.propTypes = {
  setParams: PropTypes.func.isRequired,
  mode: PropTypes.oneOf(["info", "schedule"]).isRequired
};

export default LineHeaderIcon;
