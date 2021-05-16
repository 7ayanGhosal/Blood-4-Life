import React, { Component } from "react";
import MapMyIndia from "mapmyindia-react";

class Map extends Component {
  state = { diaplay: false };

  componentDidMount() {
    setTimeout(() => {
      // document.getElementById("EmerListLoader").scrollIntoView();
      this.props.stopLoader();
      this.setState({ display: true });
    }, 1500);
  }

  render() {
    var UserMarkers = [];
    var HospMarkers = [];

    for (var i = 0; i < this.props.UserPoints.length; i++) {
      UserMarkers.push({
        position: [this.props.UserPoints[i].lat, this.props.UserPoints[i].lng],
        draggable: false,
        title: "User",
      });
    }
    for (var i = 0; i < this.props.HospitalPoints.length; i++) {
      HospMarkers.push({
        position: [
          this.props.HospitalPoints[i].lat,
          this.props.HospitalPoints[i].lng,
        ],
        draggable: false,
        title: "Hospital",
      });
    }
    return this.state.display ? (
      <MapMyIndia
        height="52vh"
        width="125%"
        center={[1100, 1100]}
        zoom="4"
        markers={[...UserMarkers, ...HospMarkers]}
      />
    ) : null;
  }
}

export default Map;
