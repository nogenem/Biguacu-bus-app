import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";

import { getLinesByDeparture } from "../reducers/lines";

class HomeList extends Component {
  keyExtractor = (item, idx) => idx;

  renderItem = ({ item }) => (
    <ListItem
      title={item.nome}
      subtitle={item.obs && `(${item.obs})`}
      rightTitle={item.tempo}
      rightTitleStyle={{ color: "#464b50" }}
      hideChevron
      titleNumberOfLines={0}
      subtitleNumberOfLines={0}
    />
  );

  render() {
    return (
      <List containerStyle={styles.list}>
        <FlatList
          data={this.props.lines}
          extraData={this.props}
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
        />
      </List>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
    marginTop: 0
  }
});

HomeList.propTypes = {
  // ownProps
  departure: PropTypes.string.isRequired,
  // mapStateToProps
  lines: PropTypes.arrayOf(
    PropTypes.shape({
      cod: PropTypes.number,
      nome: PropTypes.string,
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
      )
    })
  ).isRequired
};

const mapStateToProps = (state, props) => ({
  lines: getLinesByDeparture(state, props.departure)
});

export const UnconnectedHomeList = HomeList;
export default connect(mapStateToProps)(HomeList);
