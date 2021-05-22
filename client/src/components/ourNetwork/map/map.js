import React, { Component } from "react";
import MapMyIndia from "mapmyindia-react";

class Map extends Component {
  componentDidMount() {
    setTimeout(() => {
      this.props.stopLoader();
    }, 3000);
  }

  render() {
    var UserMarkers = [];
    var HospMarkers = [];
    var MidMarkers = [];
    var i;

    for (i = 0; i < this.props.UserPoints.length; i++) {
      UserMarkers.push({
        position: [this.props.UserPoints[i].lat, this.props.UserPoints[i].lng],
        draggable: false,
        title: "User",
      });
    }
    for (i = 0; i < this.props.HospitalPoints.length; i++) {
      HospMarkers.push({
        position: [
          this.props.HospitalPoints[i].lat,
          this.props.HospitalPoints[i].lng,
        ],
        draggable: false,
        title: "Hospital",
      });
    }
    MidMarkers.push({
      position: [23.4358, 81.8463],
      draggable: false,
      title: "midPoint",
    });
    return (
      <MapMyIndia
        height="400px"
        zoom="4"
        markers={[...UserMarkers, ...HospMarkers, ...MidMarkers]}
      />
    );
  }
}

export default Map;
