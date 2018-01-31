import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

const getKey = (txt, idx) => `${idx}_${txt}`;

class TabContentText extends PureComponent {
  render() {
    const { texts } = this.props;
    return (
      <View style={styles.container}>
        {texts.map((txt, idx) => (
          <Text key={getKey(txt, idx)} style={styles.text}>
            {txt}
          </Text>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    height: 40,
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: "#ccc",
    backgroundColor: "#f8f8f8",
    marginVertical: 5,
    paddingHorizontal: 10
  },
  text: {
    textAlign: "center",
    fontWeight: "500"
  }
});

TabContentText.propTypes = {
  // ownProps
  texts: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default TabContentText;
