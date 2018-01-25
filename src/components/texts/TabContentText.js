import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

class TabContentText extends PureComponent {
  render() {
    const { text } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    justifyContent: "center",
    width: 55,
    height: 30,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#f8f8f8",
    margin: 2
  },
  text: {
    textAlign: "center",
    fontWeight: "500"
  }
});

TabContentText.propTypes = {
  // ownProps
  text: PropTypes.string.isRequired
};

export default TabContentText;
