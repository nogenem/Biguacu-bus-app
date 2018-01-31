import React, { PureComponent } from "react";
import PropTypes from "prop-types";

import ScheduleTabs from "../tabs/ScheduleTabs";

class LineScheduleView extends PureComponent {
  render() {
    const { data, index } = this.props;
    return <ScheduleTabs data={data[index]} />;
  }
}

LineScheduleView.propTypes = {
  // ownProps
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
  ).isRequired,
  index: PropTypes.number.isRequired
};

export default LineScheduleView;
