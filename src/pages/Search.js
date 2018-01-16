import React, { Component } from "react";
import { View, Text } from "react-native";

class Search extends Component {
	
  componentDidMount() {
	// load routes, { id, route_name }, 'not in [...Object.keys(state.lines)]',
	// if not loaded yet (!store.status.routesLoaded)
	//   para n carregar dados que ja fora carregados pela HOME
	
	// verificar se tem como passar dados para as tabs
		// se tiver ID como dado, então mostra dados da route[ID]
		// caso contrario mostra a lista de routes
		// PS: como voltar para a lista de routes?
  }
	
  render() {
    return (
      <View>
		{/* if(!tab->data->id) <ListView /> */}
		{/* else <RouteView id={tab->data->id} /> */}
        <Text>Search</Text>
      </View>
    );
  }
}

export default Search;
