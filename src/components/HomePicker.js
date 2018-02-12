import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Picker, StyleSheet } from "react-native";

import { DEFAULT_DEPARTURE } from "../constants/defaults";
import { globalStyles } from "../constants/styles";

class HomePicker extends PureComponent {
  state = {
    selectedValue: DEFAULT_DEPARTURE
  };

  onValueChange = itemValue => {
    this.setState({ selectedValue: itemValue });
    this.props.onValueChange(itemValue);
  };

  render() {
    const { departures } = this.props;
    const { selectedValue } = this.state;
    return (
      <View style={styles.picker_container}>
        <Text style={styles.text_saida}>Saída:</Text>
        <Picker
          selectedValue={selectedValue}
          onValueChange={this.onValueChange}
          style={globalStyles.flex1}
          itemStyle={styles.picker_item}
        >
          {departures.map((dep, idx) => (
            <Picker.Item key={idx} label={dep} value={dep} />
          ))}
        </Picker>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  picker_container: StyleSheet.flatten([
    {
      flex: 0,
      flexDirection: "row",
      height: 45,
      backgroundColor: "#f1f1f1",
      padding: 3,
      borderBottomWidth: 1,
      borderBottomColor: "#727475",
      borderTopWidth: 1,
      borderTopColor: "#727475"
    },
    globalStyles.flexCenter
  ]),
  text_saida: {
    fontSize: 14,
    fontWeight: "200",
    color: "black"
  }
});

HomePicker.propTypes = {
  // ownProps
  departures: PropTypes.arrayOf(PropTypes.string).isRequired,
  onValueChange: PropTypes.func.isRequired
};

export default HomePicker;
