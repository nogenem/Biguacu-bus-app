import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../constants/styles";
import { DEFAULT_DEPARTURE } from "../constants/defaults";
import HomePicker from "../components/HomePicker";
import { loadDepartures, loadDepartureLines } from "../actions/departures";
import { getDepartures } from "../reducers/departures";
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
    // TODO: verifica status e chama loadDepartureLines
  };

  render() {
    const { departures } = this.props;
    return (
      <View style={styles.outerContainer}>
        <View style={styles.subheader}>
          <Text style={styles.subheader_text}>Próximas partidas</Text>
        </View>
        <HomePicker
          departures={departures}
          onValueChange={this.onPickerValueChange}
        />
        {/* TODO: pensar no melhor jeito de passar 
                  os dados para a HomeList */}
        <HomeList />
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
  // mapStateToProps
  departures: PropTypes.arrayOf(PropTypes.string).isRequired,
  // mapDispatchToProps
  loadDepartures: PropTypes.func.isRequired,
  loadDepartureLines: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  departures: getDepartures(state)
});

export const UnconnectedHome = Home;
export default connect(mapStateToProps, { loadDepartures, loadDepartureLines })(
  Home
);
