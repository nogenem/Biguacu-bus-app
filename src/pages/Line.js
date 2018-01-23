import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { View, Text, StyleSheet } from "react-native";

import { colors } from "../constants/styles";
import LineHeaderIcon from "../components/icons/LineHeaderIcon";
import LineSubHeaderIcon from "../components/icons/LineSubHeaderIcon";
import LineInfoView from "../components/views/LineInfoView";
import LineScheduleView from "../components/views/LineScheduleView";

const HeaderTitle = ({ nome, obs }) => (
  <View>
    <Text style={styles.headerTitle}>{nome}</Text>
    {obs && <Text style={styles.headerSubtitle}>({obs})</Text>}
  </View>
);

class Line extends PureComponent {
  static navigationOptions = props => {
    const { state, setParams } = props.navigation;
    const { params } = state;
    return {
      headerTitle: <HeaderTitle nome={params.nome} obs={params.obs} />,
      headerBackTitle: "Voltar",
      headerBackTitleStyle: styles.headerBackTitle,
      headerTintColor: "white",
      headerStyle: styles.header,
      headerRight: <LineHeaderIcon setParams={setParams} mode={params.mode} />
    };
  };

  state = {
    dataIndex: 0,
    // test data
    line: {
      cod: "12400",
      nome: "SHOPPING CENTER ITAGUACU",
      obs: "VIA ESTREITO",
      updated_at: "15/01/2018",
      tempo: "35 minutos",
      preco: "R$ 3,50",
      data: [
        {
          saida: "BAIRRO",
          weekdays: [
            {
              dia: "Semana",
              schedule: ["05:50", "06:50"]
            },
            {
              dia: "Sábado",
              schedule: ["07:30", "08:30"]
            }
          ]
        },
        {
          saida: "TICEN - PLATAFORMA E",
          weekdays: [
            {
              dia: "Semana",
              schedule: ["05:50", "06:50"]
            },
            {
              dia: "Sábado",
              schedule: ["07:30", "08:30"]
            }
          ]
        }
      ]
    }
  };

  onSubHeaderIconPress = () => {
    this.setState(old => ({
      dataIndex: (old.dataIndex + 1) % 2
    }));
  };

  render() {
    const { params } = this.props.navigation.state;
    const { line, dataIndex } = this.state;
    const lineData = line.data[dataIndex];
    return (
      <View style={styles.outerContainer}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>
            {params.mode === "info" ? "Informações" : lineData.saida}
          </Text>
          {params.mode !== "info" && (
            <LineSubHeaderIcon
              index={this.state.dataIndex}
              onPress={this.onSubHeaderIconPress}
            />
          )}
        </View>
        {params.mode === "info" ? (
          <LineInfoView data={this.state.line} />
        ) : (
          <LineScheduleView data={lineData} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  header: { backgroundColor: colors.primary },
  headerBackTitle: { color: "white" },
  headerTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "white"
  },
  headerSubtitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "white"
  },
  outerContainer: {
    flex: 1
  },
  subHeader: {
    height: 40,
    flex: 0,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderTopColor: "white",
    borderTopWidth: 2,
    backgroundColor: colors.primary_light
  },
  subHeaderText: {
    flexGrow: 1,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
    fontSize: 18
  }
});

HeaderTitle.propTypes = {
  nome: PropTypes.string.isRequired,
  obs: PropTypes.string.isRequired
};

Line.propTypes = {
  // ownProps
  navigation: PropTypes.shape({
    state: PropTypes.shape({
      params: PropTypes.shape({
        cod: PropTypes.number,
        nome: PropTypes.string,
        obs: PropTypes.string
      }).isRequired
    }).isRequired,
    setParams: PropTypes.func
  }).isRequired
};

export default Line;
