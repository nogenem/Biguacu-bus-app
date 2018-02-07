import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

class HomeListItem extends PureComponent {
  onPress = () => {
    const { cod, nome, obs } = this.props.item;
    this.props.onPressItem({ cod, nome, obs });
  };

  render() {
    const { item } = this.props;
    return (
      <ListItem
        title={item.nome}
        subtitle={item.obs && `(${item.obs})`}
        rightTitle={item.hora}
        rightTitleStyle={styles.rightTitle}
        hideChevron
        titleNumberOfLines={0}
        subtitleNumberOfLines={0}
        onPress={this.onPress}
      />
    );
  }
}

const styles = StyleSheet.create({
  rightTitle: {
    color: "#464b50"
  }
});

HomeListItem.propTypes = {
  item: PropTypes.shape({
    cod: PropTypes.number,
    nome: PropTypes.string,
    obs: PropTypes.string,
    hora: PropTypes.string
  }).isRequired,
  onPressItem: PropTypes.func.isRequired
};

export default HomeListItem;
