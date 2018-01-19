import { StackNavigator } from "react-navigation";

import TabsNavigator from "./TabsNavigator";
import Line from "../../pages/Line";

export default StackNavigator({
  Main: {
    screen: TabsNavigator,
    path: "/",
    navigationOptions: {
      header: null
    }
  },
  Line: { screen: Line, path: "/line/:cod" }
});
