import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { StyleSheet, NetInfo, Alert } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button
} from "native-base";
import Spinner from "react-native-loading-spinner-overlay";

import { updateLines } from "../actions/lines";
import { colors } from "../constants/styles";
import handleErrors from "../utils/handleErrors";

class Update extends Component {
  state = {
    loading: false
  };

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
      <Container>
        <Content>
          <Spinner
            visible={this.state.loading}
            textContent="Carregando..."
            color={colors.primary_light}
            textStyle={styles.spinner_text}
          />
          <Card>
            <CardItem header bordered>
              <Text>Update</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  Esta opção atualizará o banco de dados de horários do APP.
                </Text>
                <Text>Isto pode levar alguns minutos.</Text>
                <Text style={styles.margin_top}>
                  Recomendamos fazer isto uma vez por mês!
                </Text>
                <Button
                  success
                  block
                  style={styles.margin_top}
                  onPress={this.checkConnection}
                >
                  <Text>Atualizar</Text>
                </Button>
              </Body>
            </CardItem>
          </Card>
        </Content>
      </Container>
    );
  }
}

Update.propTypes = {
  // mapDispatchToProps
  updateLines: PropTypes.func.isRequired
};

const styles = StyleSheet.create({
  margin_top: {
    marginTop: 10
  },
  spinner_text: {
    color: colors.primary_light
  }
});

export const UnconnectedUpdate = Update;
export default connect(null, { updateLines })(Update);
