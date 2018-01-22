import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet, FlatList } from "react-native";
import { List, SearchBar } from "react-native-elements";

import SearchListItem from "../components/list_items/SearchListItem";

class Search extends PureComponent {
  state = {
    lines: [{ cod: "1", nome: "Biguaçu" }, { cod: "2", nome: "Ceasa" }]
  };

  componentDidMount() {
    // load lines, { id, line_name }, 'not in [...Object.keys(state.lines)]',
    // if not loaded yet (!store.status.linesLoaded)
    //   para n carregar dados que ja fora carregados pela HOME
  }

  onPressItem = (cod, nome) => {
    this.props.navigation.navigate("Line", { cod, nome });
  };

  onChangeText = newText => console.log("CHANGED: ", newText);

  keyExtractor = line => line.cod;

  renderLine2 = line => (
    <SearchListItem
      cod={line.item.cod}
      nome={line.item.nome}
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
  }).isRequired
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  list: {
    marginTop: 0
  }
});

export default Search;
