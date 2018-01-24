import React from "react";
import PropTypes from "prop-types";
import { View, ScrollView, Text, StyleSheet } from "react-native";

const TabContentText = ({ text }) => (
  <View style={styles.text_container}>
    <Text style={styles.text}>{text}</Text>
  </View>
);

const getKey = (time, idx) => `${idx}_${time}`;

const ScheduleTabContent = ({ schedule }) => (
  <ScrollView contentContainerStyle={styles.content_container}>
    {schedule.map((time, idx) => (
      <TabContentText key={getKey(time, idx)} text={time} />
    ))}
  </ScrollView>
);

const styles = StyleSheet.create({
  content_container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2
  },
  text_container: {
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

ScheduleTabContent.propTypes = {
  // ownProps
  schedule: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ScheduleTabContent;
