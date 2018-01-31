import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ScrollView, StyleSheet, Dimensions } from "react-native";

import TabContentText from "../texts/TabContentText";

const itemWidth = 55;

class ScheduleTabContent extends PureComponent {
  state = {
    numColumns: Math.floor(Dimensions.get("window").width / itemWidth)
  };

  onLayout = contentWidth => {
    // const { width } = event.nativeEvent.layout;
    const numColumns = Math.floor(contentWidth / itemWidth);
    this.setState({ numColumns });
  };

  renderItems = () => {
    const { numColumns } = this.state;
    const { schedule } = this.props;
    const content = [];

    for (let i = 0; i < schedule.length; i += numColumns) {
      content.push(
        <TabContentText key={i} texts={schedule.slice(i, i + numColumns)} />
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
  schedule: PropTypes.arrayOf(PropTypes.string).isRequired
};

export default ScheduleTabContent;
