import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import sortBy from "lodash.sortby";

import { getLinesByDeparture } from "../reducers/lines";
import { getTimeNowWithPadding, getTimeDiff } from "../utils/dateUtils";
import getNextTimes from "../utils/getNextTimes";
import fixNextTimesList from "../utils/fixNextTimesList";

class HomeList extends Component {
  static MAX_LIST_ITEMS = 10;

  constructor(props) {
    super(props);

    this.state = {
      data: []
    };
    this.timerID = null;
  }

  componentWillReceiveProps(newProps) {
    if (this.props.lines !== newProps.lines) {
      this.clearTimer();
      if (newProps.lines.length) {
        this.updateData(newProps.lines, newProps.departure);
        this.timerID = setInterval(this.updateData, 2000);
      } else this.setState({ data: newProps.lines });
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  clearTimer = () => {
    if (this.timerID) clearInterval(this.timerID);
    this.timerID = null;
  };

  keyExtractor = (item, idx) => idx;

  updateData = (lines = this.props.lines, departure = this.props.departure) => {
    if (this.state.data.length && this.props.lines === lines) {
      const { totalDiff } = getTimeDiff(this.state.data[0].hora);

      // Ainda não chego no 1* horário da lista
      if (totalDiff > 0) return;
    }

    let ret = [];
    const cDate = new Date();
    const cHour = getTimeNowWithPadding(cDate);
    const cDay = cDate.getDay();

    lines.forEach(line => {
      ret.push(...getNextTimes(line, departure, cHour, cDay));
    });

    // Ordena pela hora, 'arruma' a lista e pega os próximos MAX_LIST_ITEMS horários
    ret = fixNextTimesList(sortBy(ret, ["hora"]), cHour);
    this.setState({
      data: ret.slice(0, HomeList.MAX_LIST_ITEMS)
    });
  };

  renderItem = ({ item }) => (
    <ListItem
      title={item.nome}
      subtitle={item.obs && `(${item.obs})`}
      rightTitle={item.hora}
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
          data={this.state.data}
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
