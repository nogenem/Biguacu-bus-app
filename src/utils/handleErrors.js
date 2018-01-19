import { Alert } from "react-native";

export default err => {
  Alert.alert(
    "Erro desconhecido",
    "Ocorreu um erro desconhecido.\nTente novamente mais tarde."
  );
  if (__DEV__) console.log("ERR: ", err);
};
