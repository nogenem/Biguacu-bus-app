import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, FlatList } from "react-native";
import { List, ListItem } from "react-native-elements";
import sortBy from "lodash.sortby";

import { getLinesByDeparture } from "../reducers/lines";

const isToday = (cDay, day) => {
  if (cDay === 0 && day === "Domingo") return true;
  else if (cDay === 6 && ["Sábado", "S\u00e1bado"].includes(day)) return true;
  return day === "Semana" && (cDay > 0 && cDay < 6);
};

const timeNow = date => {
  let h = date.getHours();
  h = `${h < 10 ? "0" : ""}${h}`;

  let m = date.getMinutes();
  m = `${m < 10 ? "0" : ""}${m}`;

  return `${h}:${m}`;
};

const getTimeDiff = time => {
  const current = new Date();
  const toCompare = new Date();
  const [h, m] = time.split(":").map(val => +val);

  toCompare.setHours(h);
  toCompare.setMinutes(m);
  toCompare.setSeconds(0);

  const diff = Math.abs(toCompare.getTime() - current.getTime()) / 1000;
  const diffHours = Math.floor(diff / 60 / 60);
  const diffMinutes = Math.floor((diff / 60) % 60);
  const diffSeconds = Math.floor(diff % 60);

  const negative = current.getTime() > toCompare.getTime();
  return {
    hours: negative ? -diffHours : diffHours,
    minutes: negative ? -diffMinutes : diffMinutes,
    seconds: negative ? -diffSeconds : diffSeconds
  };
};

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
      let timeDiff = getTimeDiff(this.state.data[0].hora);
      timeDiff = Object.values(timeDiff).reduce((acc, val) => acc + val, 0);

      // Ainda não chego no 1* horário da lista
      if (timeDiff > 0) return;
    }

    const ret = [];
    const cDate = new Date();
    const cHour = timeNow(cDate);
    const cDay = cDate.getDay();

    lines.forEach(line => {
      const { cod, nome, obs } = line;
      // Filtra pela saída atual
      const [data] = line.data.filter(({ saida }) => saida === departure);
      // Filtra pelo dia da semana
      const [{ schedule }] = data.weekdays.filter(({ dia }) =>
        isToday(cDay, dia)
      );
      // Pega no máximo os 3 próximos horários de cada linha
      let count = 0;
      for (let i = 0; i < schedule.length; i++) {
        const hora = schedule[i];
        if (cHour < hora) {
          ret.push({
            cod,
            nome,
            obs,
            hora
          });
          count += 1;
        }
        if (count === 3) break;
      }
    });

    // Ordena pela hora e pega os próximos MAX_LIST_ITEMS horários
    this.setState({
      data: sortBy(ret, ["hora"]).slice(0, HomeList.MAX_LIST_ITEMS)
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
