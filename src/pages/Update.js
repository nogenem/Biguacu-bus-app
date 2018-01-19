import React, { Component } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Card,
  CardItem,
  Body,
  Text,
  Button
} from "native-base";
import { getAllUpdatedAt, updateAll } from "../database/routes";
import { getRoutes, getRoute } from "../extractors";

class Update extends Component {
  // TODO: transformar em action e perguntar antes se tem certeza/verificar conexão
  update = async () => {
    try {
      const oldData = await getAllUpdatedAt();
      const routes = await getRoutes();
      const lists = {
        toUpdate: [],
        toAdd: [],
        toDelete: []
      };

      await Promise.all(
        Object.values(routes).map(async route => {
          const old = oldData[route.cod] || {};
          let data = await getRoute(route.cod, old.updated_at);
          if (data.updated_at) {
            data = { ...data, ...route };

            if (oldData[route.cod]) {
              lists.toUpdate.push(data);
              delete oldData[route.cod];
            } else {
              lists.toAdd.push(data);
            }
          } else if (oldData[route.cod]) {
            delete oldData[route.cod];
          }
        })
      );

      const remainingKeys = Object.keys(oldData);
      if (remainingKeys.length > 0) lists.toDelete = remainingKeys;

      await updateAll(lists);
      console.log(`${lists.toAdd.length} linha(s) adicinada(s).`);
      console.log(`${lists.toUpdate.length} linha(s) atualizada(s).`);
      console.log(`${lists.toDelete.length} linha(s) deletada(s).`);
    } catch (err) {
      // TODO: melhorar tratamento de erro
      console.log("ERR: ", err);
    }
  };

  render() {
    return (
      <Container>
        <Content>
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
                  onPress={this.update}
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

const styles = StyleSheet.create({
  margin_top: {
    marginTop: 10
  }
});

export default Update;
