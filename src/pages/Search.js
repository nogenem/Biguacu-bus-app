import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, Button } from "react-native";

class Search extends PureComponent {
  componentDidMount() {
    // load lines, { id, line_name }, 'not in [...Object.keys(state.lines)]',
    // if not loaded yet (!store.status.linesLoaded)
    //   para n carregar dados que ja fora carregados pela HOME
    // verificar se tem como passar dados para as tabs
    // se tiver ID como dado, então mostra dados da line[ID]
    // caso contrario mostra a lista de lines
    // PS: como voltar para a lista de lines?
  }

  render() {
    return (
      <View>
        <Text>Search</Text>
        {/* apenas exemplo */}
        <Button
          onPress={() =>
            this.props.navigation.navigate("Line", { cod: "12345" })
          }
          title="Go to Line 12345"
        />
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

export default Search;
