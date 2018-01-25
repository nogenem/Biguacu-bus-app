import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet } from "react-native";

import TabContentText from "../texts/TabContentText";

const getKey = (time, idx) => `${idx}_${time}`;

class ScheduleTabContent extends PureComponent {
  render() {
    const { schedule } = this.props;
    return (
      <ScrollView contentContainerStyle={styles.container}>
        {schedule.map((time, idx) => (
          <TabContentText key={getKey(time, idx)} text={time} />
        ))}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    padding: 2
  }
});

ScheduleTabContent.propTypes = {
  // ownProps
  schedule: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ScheduleTabContent;
