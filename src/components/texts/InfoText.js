import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";

const InfoText = ({ description, data }) => {
  return (
    <Text>
      <Text style={styles.bold}>{description}:</Text> {data}
    </Text>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  }
});

InfoText.propTypes = {
  // ownProps
  description: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired
};

export default InfoText;
