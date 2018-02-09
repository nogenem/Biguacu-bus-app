import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, StyleSheet, NetInfo, Alert } from "react-native";
import { Card, Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/MaterialIcons";

import { updateLines } from "../actions/lines";
import { colors } from "../constants/styles";
import handleErrors from "../utils/handleErrors";

class Update extends PureComponent {
  static navigationOptions = props => {
    const { state } = props.navigation;
    return {
      tabBarLabel: ({ tintColor }) => (
        <View>
          <Text style={{ color: tintColor }}>UPDATE</Text>
          {state.params &&
            state.params.showBadge && (
              <Icon
                style={styles.icon_badge}
                name="error"
                size={15}
                color="yellow"
              />
            )}
        </View>
      )
    };
  };

  state = {
    loading: false
  };

  componentDidMount() {
    // TODO: carregar last_update do banco de dados
    // e verificar se deve mostrar badge, today - last_update >= 30dias
    // this.props.navigation.setParams({ showBadge: true });
  }

  update = async () => {
    this.setState({ loading: true });
    try {
      const lists = await this.props.updateLines();
      Alert.alert(
        "Resultado da atualização",
        `${lists.toAdd} linha(s) adicinada(s);\n` +
          `${lists.toUpdate} linha(s) atualizada(s);\n` +
          `${lists.toDelete} linha(s) deletada(s).`
      );
    } catch (err) {
      handleErrors(err);
    }
    this.setState({ loading: false });
  };

  checkConnection = async () => {
    try {
      const { type } = await NetInfo.getConnectionInfo();
      if (type === "none")
        Alert.alert(
          "Sem conexão",
          "É necessário estar conectado para poder executar esta operação."
        );
      else if (!type || type === "unknown")
        Alert.alert(
          "Sem conexão?",
          "Não foi possível detectar o tipo da sua conexão.\nPor favor tente novamente mais tarde."
        );
      else if (!["wifi", "ethernet"].includes(type))
        Alert.alert(
          "Conexão impropria",
          "Recomendamos a utilização de wi-fi para esta operação.\nDeseja continuar mesmo assim?",
          [{ text: "Ok", onPress: this.update }, { text: "Cancelar" }]
        );
      else this.update();
    } catch (err) {
      handleErrors(err);
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <Spinner
          visible={this.state.loading}
          textContent="Carregando..."
          color={colors.primary}
          textStyle={styles.spinner_text}
        />
        <Card title="Update">
          <Text>
            Esta opção atualizará o banco de dados de horários do APP.
          </Text>
          <Text>Isto pode levar alguns minutos.</Text>
          <Text style={styles.last_text}>
            Recomendamos fazer isto uma vez por mês!
          </Text>
          <Button
            icon={icons.button}
            backgroundColor={colors.primary_dark}
            buttonStyle={styles.button}
            fontWeight="bold"
            title="Atualizar"
            disabled={this.state.loading}
            onPress={this.checkConnection}
          />
        </Card>
      </View>
    );
  }
}

Update.propTypes = {
  // ownProps
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        showBadge: PropTypes.bool
      })
    }),
    setParams: PropTypes.func
  }).isRequired,
  // mapDispatchToProps
  updateLines: PropTypes.func.isRequired
};

const icons = {
  button: {
    name: "autorenew"
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  last_text: {
    marginTop: 10,
    fontWeight: "bold"
  },
  button: {
    marginTop: 10
  },
  spinner_text: {
    color: colors.primary
  },
  icon_badge: {
    position: "absolute",
    top: -8,
    right: -13
  }
});

export const UnconnectedUpdate = Update;
export default connect(null, { updateLines })(Update);
