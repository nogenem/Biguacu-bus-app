import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../../constants/styles";

const getKey = (txt, idx) => `${idx}_${txt}`;

class TabContentText extends PureComponent {
  getTextStyle = txt => {
    const { timesAround } = this.props;
    if (txt === timesAround.middle) return styles.text_middle;
    if (timesAround.before.includes(txt)) return styles.text_before;
    if (timesAround.after.includes(txt)) return styles.text_after;
    return styles.text;
  };

  render() {
    const { texts } = this.props;
    return (
      <View style={styles.container}>
        {texts.map((txt, idx) => (
          <Text key={getKey(txt, idx)} style={this.getTextStyle(txt)}>
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
  },
  text_before: {
    textAlign: "center",
    fontWeight: "500",
    textDecorationLine: "underline",
    color: colors.primary
  },
  text_middle: {
    textAlign: "center",
    fontWeight: "700",
    textDecorationLine: "underline",
    color: colors.primary_dark
  },
  text_after: {
    textAlign: "center",
    fontWeight: "500",
    textDecorationLine: "underline",
    color: colors.primary
  }
});

TabContentText.propTypes = {
  // ownProps
  texts: PropTypes.arrayOf(PropTypes.string).isRequired,
  timesAround: PropTypes.shape({
    before: PropTypes.arrayOf(PropTypes.string),
    middle: PropTypes.string,
    after: PropTypes.arrayOf(PropTypes.string)
  }).isRequired
};

export default TabContentText;
