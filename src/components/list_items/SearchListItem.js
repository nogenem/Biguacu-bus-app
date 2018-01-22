import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

class SearchListItem extends PureComponent {
  onPress = () => {
    const { cod, nome, obs } = this.props;
    this.props.onPressItem({ cod, nome, obs });
  };

  render() {
    const { nome, obs } = this.props;
    return (
      <ListItem
        title={nome}
        subtitle={obs && `(${obs})`}
        subtitleStyle={styles.subtitle}
        onPress={this.onPress}
      />
    );
  }
}

SearchListItem.propTypes = {
  cod: PropTypes.number.isRequired,
  nome: PropTypes.string.isRequired,
  obs: PropTypes.string,
  onPressItem: PropTypes.func.isRequired
};

SearchListItem.defaultProps = {
  obs: ""
};

const styles = StyleSheet.create({
  subtitle: {
    fontSize: 12
  }
});

export default SearchListItem;
