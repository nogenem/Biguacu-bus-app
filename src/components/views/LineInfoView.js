import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";
import { Card } from "react-native-elements";

const InfoText = ({ description, data }) => (
  <Text>
    <Text style={styles.bold}>{description}:</Text> {data}
  </Text>
);

const LineInfoView = ({ data, visible }) => {
  if (!visible) return null;

  const { cod, nome, obs, updated_at: updatedAt, tempo, preco } = data;
  const linha = `${cod} ${nome}`;
  return (
    <Card>
      <InfoText description="Linha" data={linha} />
      {!!obs && <InfoText description="Obs" data={obs} />}
      <InfoText description="Tempo de viagem" data={tempo} />
      <InfoText description="Tarifa" data={preco} />
      <InfoText description="Última atualização" data={updatedAt} />
    </Card>
  );
};

const styles = StyleSheet.create({
  bold: {
    fontWeight: "bold"
  }
});

InfoText.propTypes = {
  description: PropTypes.string.isRequired,
  data: PropTypes.string.isRequired
};

LineInfoView.propTypes = {
  data: PropTypes.shape({
    cod: PropTypes.number,
    nome: PropTypes.string,
    obs: PropTypes.string,
    updated_at: PropTypes.string,
    tempo: PropTypes.string,
    preco: PropTypes.string
  }).isRequired,
  visible: PropTypes.bool.isRequired
};

export default LineInfoView;
