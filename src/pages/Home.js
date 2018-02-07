import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../constants/styles";
import { DEFAULT_DEPARTURE } from "../constants/defaults";
import HomePicker from "../components/HomePicker";
import { loadDepartures, loadDepartureLines } from "../actions/departures";
import { getDepartures } from "../reducers/departures";
import { getListByDeparture } from "../reducers/lines";
import HomeList from "../components/HomeList";
import handleErrors from "../utils/handleErrors";

class Home extends PureComponent {
  state = {
    currentDeparture: DEFAULT_DEPARTURE
  };

  componentDidMount() {
    this.props.loadDepartures().catch(err => handleErrors(err));
    this.props
      .loadDepartureLines(this.state.currentDeparture)
      .catch(err => handleErrors(err));
  }

  componentWillReceiveProps(newProps) {
    // Irá acontecer quando atualizar as linhas
    if (this.props.departures.length > 0 && newProps.departures.length === 0) {
      this.props.loadDepartures();
    }
  }

  onPickerValueChange = value => {
    this.setState({ currentDeparture: value });
    if (!this.props.isDepartureLinesLoaded(value))
      this.props.loadDepartureLines(value).catch(err => handleErrors(err));
  };

  render() {
    const { departures, navigation } = this.props;
    const { currentDeparture } = this.state;
    return (
      <View style={styles.outerContainer}>
        <View style={styles.subheader}>
          <Text style={styles.subheader_text}>Próximas partidas</Text>
        </View>
        <HomePicker
          departures={departures}
          onValueChange={this.onPickerValueChange}
        />
        <HomeList departure={currentDeparture} navigation={navigation} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1
  },
  subheader: {
    flex: 0,
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    backgroundColor: colors.primary_light,
    borderTopColor: "white",
    borderTopWidth: 2
  },
  subheader_text: {
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
});

Home.propTypes = {
  // ownProps
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired,
  // mapStateToProps
  departures: PropTypes.arrayOf(PropTypes.string).isRequired,
  isDepartureLinesLoaded: PropTypes.func.isRequired,
  // mapDispatchToProps
  loadDepartures: PropTypes.func.isRequired,
  loadDepartureLines: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  departures: getDepartures(state),
  isDepartureLinesLoaded: departure => !!getListByDeparture(state)[departure]
});

export const UnconnectedHome = Home;
export default connect(mapStateToProps, { loadDepartures, loadDepartureLines })(
  Home
);
