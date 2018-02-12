import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, StyleSheet, FlatList } from "react-native";
import { List, SearchBar } from "react-native-elements";

import { loadLinesNameAndObs } from "../actions/lines";

import { getLinesNameAndObs, getLinesLoaded } from "../reducers/lines";

import SearchListItem from "../components/list_items/SearchListItem";
import handleErrors from "../utils/handleErrors";

class Search extends PureComponent {
  state = {
    lines: []
  };

  componentDidMount() {
    this.props.loadLinesNameAndObs().catch(err => handleErrors(err));
  }

  componentWillReceiveProps(newProps) {
    if (this.props.linesLoaded && !newProps.linesLoaded) {
      this.props.loadLinesNameAndObs().catch(err => handleErrors(err));
      return;
    }

    if (this.props.linesNames !== newProps.linesNames)
      this.setState({ lines: newProps.linesNames });
  }

  onPressItem = data => {
    this.props.navigation.navigate("Line", { ...data, mode: "info" });
  };

  onChangeText = newText => {
    const filter = newText.trim().toLowerCase();
    let lines = this.props.linesNames;

    if (!filter) this.setState({ lines });

    lines = lines.filter(line =>
      `${line.nome} ${line.obs}`.toLowerCase().includes(filter)
    );
    this.setState({ lines });
  };

  keyExtractor = line => line.cod;

  renderLine2 = ({ item }) => (
    <SearchListItem
      cod={item.cod}
      nome={item.nome}
      obs={item.obs}
      onPressItem={this.onPressItem}
    />
  );

  render() {
    return (
      <View style={styles.container}>
        <SearchBar
          onChangeText={this.onChangeText}
          placeholder="Search..."
          lightTheme
          clearIcon
        />
        <List containerStyle={styles.list}>
          <FlatList
            data={this.state.lines}
            extraData={this.state}
            keyExtractor={this.keyExtractor}
            renderItem={this.renderLine2}
          />
        </List>
      </View>
    );
  }
}

Search.propTypes = {
  // ownProps
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  }).isRequired,
  linesLoaded: PropTypes.bool.isRequired,
  linesNames: PropTypes.arrayOf(
    PropTypes.shape({
      cod: PropTypes.number,
      nome: PropTypes.string
    }).isRequired
  ).isRequired,
  // mapStateToProps
  loadLinesNameAndObs: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    marginTop: 0
  }
});

const mapStateToProps = state => ({
  linesLoaded: getLinesLoaded(state),
  linesNames: getLinesNameAndObs(state)
});

export const UnconnectedSearch = Search;
export default connect(mapStateToProps, { loadLinesNameAndObs })(Search);
