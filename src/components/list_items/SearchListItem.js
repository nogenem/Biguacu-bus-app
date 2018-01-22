import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { ListItem } from "react-native-elements";

class SearchListItem extends PureComponent {
  onPress = () => {
    const { cod, nome } = this.props;
    this.props.onPressItem(cod, nome);
  };

  render() {
    return <ListItem title={this.props.nome} onPress={this.onPress} />;
  }
}

SearchListItem.propTypes = {
  cod: PropTypes.string.isRequired,
  nome: PropTypes.string.isRequired,
  onPressItem: PropTypes.func.isRequired
};

export default SearchListItem;
