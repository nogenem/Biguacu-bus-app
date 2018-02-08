import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet, Dimensions } from "react-native";

import TabContentText from "../texts/TabContentText";
import getTimesAround from "../../utils/getTimesAround";
import { isSameDayOfWeek } from "../../utils/dateUtils";
import { SEMANA, SABADO, DOMINGO } from "../../constants/daysOfWeek";

const itemWidth = 55;

class ScheduleTabContent extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      numColumns: Math.floor(Dimensions.get("window").width / itemWidth),
      timesAround: {}
    };
    if (isSameDayOfWeek(new Date().getDay(), props.dayOfWeek))
      this.state.timesAround = getTimesAround(props.schedule);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.schedule !== newProps.schedule) {
      if (isSameDayOfWeek(new Date().getDay(), newProps.dayOfWeek))
        this.setState({
          timesAround: getTimesAround(newProps.schedule)
        });
      else
        this.setState({
          timesAround: {}
        });
    }
  }

  onLayout = contentWidth => {
    // const { width } = event.nativeEvent.layout;
    const numColumns = Math.floor(contentWidth / itemWidth);
    this.setState({ numColumns });
  };

  renderItems = () => {
    const { numColumns, timesAround } = this.state;
    const { schedule } = this.props;
    const content = [];

    for (let i = 0; i < schedule.length; i += numColumns) {
      content.push(
        <TabContentText
          key={i}
          texts={schedule.slice(i, i + numColumns)}
          timesAround={timesAround}
        />
      );
    }
    return content;
  };

  render() {
    return (
      <ScrollView
        contentContainerStyle={styles.container}
        onContentSizeChange={this.onLayout}
        vertical
      >
        {this.renderItems()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 2
  }
});

ScheduleTabContent.propTypes = {
  // ownProps
  schedule: PropTypes.arrayOf(PropTypes.string).isRequired,
  dayOfWeek: PropTypes.oneOf([SEMANA, SABADO, DOMINGO]).isRequired
};

export default ScheduleTabContent;
