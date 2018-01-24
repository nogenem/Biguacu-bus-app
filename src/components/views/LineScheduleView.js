import React from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import ScheduleTabs from "../tabs/ScheduleTabs";

const LineScheduleView = ({ data, index, visible }) => {
  if (!visible) return null;
  return (
    <View style={styles.container}>
      {data.map((item, idx) => (
        <ScheduleTabs key={idx} data={item} visible={idx === index} />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

LineScheduleView.propTypes = {
  // ownProps
  data: PropTypes.arrayOf(
    PropTypes.shape({
      saida: PropTypes.string,
      weekdays: PropTypes.arrayOf(
        PropTypes.shape({
          dia: PropTypes.string,
          schedule: PropTypes.arrayOf(PropTypes.string)
        })
      )
    })
  ).isRequired,
  index: PropTypes.number.isRequired,
  visible: PropTypes.bool.isRequired
};

export default LineScheduleView;
