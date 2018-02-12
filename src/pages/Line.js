import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { View, Text, StyleSheet } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";

import { colors, globalStyles } from "../constants/styles";
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
      headerTintColor: colors.primary_text,
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
      <View style={globalStyles.flex1}>
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
  headerBackTitle: { color: colors.primary_text },
  headerTitle: StyleSheet.flatten([
    {
      fontSize: 16
    },
    globalStyles.primary_text
  ]),
  headerSubtitle: StyleSheet.flatten([
    {
      fontSize: 12
    },
    globalStyles.primary_text
  ]),
  subHeader: StyleSheet.flatten([
    {
      height: 40,
      flex: 0,
      flexDirection: "row",
      borderTopColor: "white",
      borderTopWidth: 2,
      backgroundColor: colors.primary_light
    },
    globalStyles.flexCenter
  ]),
  subHeaderText: StyleSheet.flatten([
    {
      flexGrow: 1,
      textAlign: "center",
      fontSize: 18
    },
    globalStyles.primary_text
  ]),
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
