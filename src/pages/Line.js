import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { colors } from "../constants/styles";
import LineHeaderIcon from "../components/icons/LineHeaderIcon";
import LineSubHeaderIcon from "../components/icons/LineSubHeaderIcon";
import LineInfoView from "../components/views/LineInfoView";
import LineScheduleView from "../components/views/LineScheduleView";
import { loadLineByCod } from "../actions/lines";
import { getLineByCod } from "../reducers/lines";
import handleErrors from "../utils/handleErrors";

const HeaderTitle = ({ nome, obs }) => (
  <View>
    <Text style={styles.headerTitle}>{nome}</Text>
    {!!obs && <Text style={styles.headerSubtitle}>({obs})</Text>}
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

  constructor(props) {
    super(props);

    this.state = {
      dataIndex: 0,
      line: props.line
    };
  }

  componentDidMount() {
    if (!this.state.line.data)
      this.props
        .loadLineByCod(this.props.navigation.state.params.cod)
        .catch(err => handleErrors(err));
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.line.data && newProps.line.data)
      this.setState({ line: newProps.line });
  }

  onSubHeaderIconPress = () => {
    this.setState(old => ({
      dataIndex: (old.dataIndex + 1) % 2
    }));
  };

  render() {
    const { params } = this.props.navigation.state;
    const { line, dataIndex } = this.state;
    if (!line.data)
      return (
        <Spinner
          visible
          textContent="Carregando..."
          color={colors.primary}
          textStyle={styles.spinner_text}
        />
      );

    const lineData = line.data[dataIndex];
    return (
      <View style={styles.outerContainer}>
        <View style={styles.subHeader}>
          <Text style={styles.subHeaderText}>
            {params.mode === "info" ? "Informações" : lineData.saida}
          </Text>
          {params.mode !== "info" && (
            <LineSubHeaderIcon
              index={dataIndex}
              onPress={this.onSubHeaderIconPress}
            />
          )}
        </View>
        {params.mode === "info" && <LineInfoView data={line} />}
        {params.mode === "schedule" && (
          <LineScheduleView data={line.data} index={dataIndex} />
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
  },
  spinner_text: {
    color: colors.primary
  }
});

HeaderTitle.propTypes = {
  // ownProps
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
  }).isRequired,
  // mapStateToProps
  line: PropTypes.shape({
    cod: PropTypes.number,
    nome: PropTypes.string,
    data: PropTypes.arrayOf(
      PropTypes.shape({
        saida: PropTypes.string,
        weekdays: PropTypes.arrayOf(
          PropTypes.shape({
            dia: PropTypes.string,
            schedule: PropTypes.arrayOf(PropTypes.string)
          })
        )
      })
    )
  }).isRequired,
  // mapDispatchToProps
  loadLineByCod: PropTypes.func.isRequired
};

const mapStateToProps = (state, props) => ({
  line: getLineByCod(state, props.navigation.state.params.cod)
});

export const UnconnectedLine = Line;
export default connect(mapStateToProps, { loadLineByCod })(Line);
