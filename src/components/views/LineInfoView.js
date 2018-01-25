import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { Card } from "react-native-elements";

import InfoText from "../texts/InfoText";

class LineInfoView extends PureComponent {
  render() {
    const { data } = this.props;
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
  }
}

LineInfoView.propTypes = {
  // ownProps
  data: PropTypes.shape({
    cod: PropTypes.number,
    nome: PropTypes.string,
    obs: PropTypes.string,
    updated_at: PropTypes.string,
    tempo: PropTypes.string,
    preco: PropTypes.string
  }).isRequired
};

export default LineInfoView;
