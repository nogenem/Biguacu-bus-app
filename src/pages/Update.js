import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, StyleSheet, NetInfo, Alert } from "react-native";
import { Card, Button } from "react-native-elements";
import Spinner from "react-native-loading-spinner-overlay";
import Icon from "react-native-vector-icons/MaterialIcons";

import { updateLines } from "../actions/lines";
import { loadUserData, setLastUpdate } from "../actions/userData";
import { getLastUpdate } from "../reducers/userData";
import { colors } from "../constants/styles";
import { DEFAULT_LAST_UPDATE_DAYS_LIMIT as DAYS_LIMIT } from "../constants/defaults";
import handleErrors from "../utils/handleErrors";
import { getDaysDiff } from "../utils/dateUtils";

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
    loading: false,
    daysDiff: 0
  };

  componentDidMount() {
    this.props.loadUserData();
  }

  componentWillReceiveProps(newProps) {
    if (
      this.props.lastUpdate !== newProps.lastUpdate &&
      !!newProps.lastUpdate
    ) {
      const daysDiff = getDaysDiff(newProps.lastUpdate);
      this.setState({ daysDiff });
      this.props.navigation.setParams({ showBadge: daysDiff >= DAYS_LIMIT });
    }
  }

  update = async () => {
    this.setState({ loading: true });
    try {
      const lists = await this.props.updateLines();
      await this.props.setLastUpdate(new Date());
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
    const { daysDiff } = this.state;
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
          {daysDiff < DAYS_LIMIT && (
            <Text style={styles.last_text}>
              Recomendamos fazer isto uma vez a cada {DAYS_LIMIT} dias!
            </Text>
          )}
          {daysDiff >= DAYS_LIMIT && (
            <Text style={styles.last_text}>
              Já se passaram mais de {DAYS_LIMIT} dias desde a ultima
              atualização do banco de dados.
            </Text>
          )}
          {daysDiff >= DAYS_LIMIT && (
            <Text style={styles.last_text}>
              Por favor, considere atualiza-lo o mais rápido possível.
            </Text>
          )}
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
  // mapStateToProps
  lastUpdate: PropTypes.string.isRequired,
  // mapDispatchToProps
  updateLines: PropTypes.func.isRequired,
  loadUserData: PropTypes.func.isRequired,
  setLastUpdate: PropTypes.func.isRequired
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

const mapStateToProps = state => ({
  lastUpdate: getLastUpdate(state)
});

export const UnconnectedUpdate = Update;
export default connect(mapStateToProps, {
  updateLines,
  loadUserData,
  setLastUpdate
})(Update);
