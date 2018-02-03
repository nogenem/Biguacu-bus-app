import React, { Component } from "react";
import PropTypes from "prop-types";
import { StyleSheet, FlatList } from "react-native";
import { List } from "react-native-elements";

class HomeList extends Component {
  keyExtractor = (item, idx) => idx;

  renderItem = item => {};

  render() {
    return (
      <List containerStyle={styles.list}>
        <FlatList
          // data={this.state.lines}
          // extraData={this.state}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    marginTop: 0
  }
});

HomeList.propTypes = {};

export default HomeList;
