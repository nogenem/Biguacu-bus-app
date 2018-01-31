import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../constants/styles";
import HomePicker from "../components/HomePicker";
import loadDepartures from "../actions/departures";
import { getDepartures } from "../reducers/departures";

class Home extends PureComponent {
  componentDidMount() {
    // load data of default departure, if not loaded yet (!store.status["default departure"])
    this.props.loadDepartures();
  }

  componentWillReceiveProps(newProps) {
    // Irá acontecer quando atualizar as linhas
    if (this.props.departures.length > 0 && newProps.departures.length === 0) {
      this.props.loadDepartures();
    }
  }

  onPickerValueChange = value => {};

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
  loadDepartures: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  departures: getDepartures(state)
});

export const UnconnectedHome = Home;
export default connect(mapStateToProps, { loadDepartures })(Home);
