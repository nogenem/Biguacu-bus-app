import React, { PureComponent } from "react";
import { View, Text } from "react-native";

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
        {/* if(!tab->data->id) <ListView /> */}
        {/* else <LineView id={tab->data->id} /> */}
        <Text>Search</Text>
      </View>
    );
  }
}

export default Search;
