import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";

import { colors } from "../../constants/styles";
import ScheduleTab from "./ScheduleTab";
import ScheduleTabContent from "./ScheduleTabContent";

class ScheduleTabs extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      tabsText: props.data.weekdays.map(item => item.dia),
      tabIndex: 0
    };
  }

  componentWillReceiveProps(newProps) {
    if (this.props.data !== newProps.data) {
      this.setState({
        tabsText: newProps.data.weekdays.map(item => item.dia)
      });
    }
  }

  onTabPress = index => {
    this.setState({
      tabIndex: index
    });
  };

  render() {
    const { tabIndex, tabsText } = this.state;
    const { data } = this.props;
    const currentData = data.weekdays[tabIndex];
    return (
      <View style={styles.container}>
        <ScheduleTabContent
          dayOfWeek={currentData.dia}
          schedule={currentData.schedule}
        />
        <View style={styles.tabs}>
          {tabsText.map((text, idx) => (
            <ScheduleTab
              key={text}
              text={text}
              index={idx}
              onPress={this.onTabPress}
              active={idx === tabIndex}
            />
          ))}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  tabs: {
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 45,
    backgroundColor: colors.primary_light
  }
});

ScheduleTabs.propTypes = {
  // ownProps
  data: PropTypes.shape({
    saida: PropTypes.string,
    weekdays: PropTypes.arrayOf(
      PropTypes.shape({
        dia: PropTypes.string,
        schedule: PropTypes.arrayOf(PropTypes.string)
      })
    )
  }).isRequired
};

export default ScheduleTabs;
