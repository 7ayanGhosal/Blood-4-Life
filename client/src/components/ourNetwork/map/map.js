import React, { Component } from "react";
import MapMyIndia from "mapmyindia-react";
import axios from "axios";

class Map extends Component {
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
    return (
      <MapMyIndia
        height="250px"
        zoom="5"
        markers={[...UserMarkers, ...HospMarkers]}
      />
    );
  }
}

export default Map;
