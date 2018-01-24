import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Text, TouchableOpacity, StyleSheet } from "react-native";

import { colors } from "../../constants/styles";

class ScheduleTab extends PureComponent {
  onPress = () => {
    this.props.onPress(this.props.index);
  };

  render() {
    const { text, active } = this.props;
    return (
      <TouchableOpacity
        onPress={this.onPress}
        style={[styles.tab, active ? styles.tab_active : styles.tab_not_active]}
      >
        <Text style={styles.tab_text}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

ScheduleTab.propTypes = {
  // ownProps
  text: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func.isRequired,
  active: PropTypes.bool
};

ScheduleTab.defaultProps = {
  // ownProps
  active: false
};

const styles = StyleSheet.create({
  tab: {
    flexGrow: 1,
    justifyContent: "center",
    height: 45,
    maxWidth: 85
  },
  tab_active: {
    borderBottomWidth: 2,
    borderBottomColor: colors.primary_dark
  },
  tab_not_active: {},
  tab_text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold"
  }
});

export default ScheduleTab;
