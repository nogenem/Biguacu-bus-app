import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { StyleSheet } from "react-native";
import { ListItem } from "react-native-elements";

class HomeListItem extends PureComponent {
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
    nome: PropTypes.string,
    obs: PropTypes.string,
    hora: PropTypes.string
  }).isRequired
};

export default HomeListItem;
