import React, { Component } from "react";
import MapMyIndia from "mapmyindia-react";
// import YourMarker from "../../../../resources/user_marker.png";

class Map extends Component {
  componentDidMount() {
    this.forceUpdate();
  }
  componentDidUpdate() {
    var icons = document.getElementsByTagName("img");
    var flag = true;
    for (var i = 0; i < icons.length; i++) {
      if (icons[i].title === "Your Location") {
        flag = false;
        icons[i].src =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/8/88/Map_marker.svg/512px-Map_marker.svg.png";
        icons[i].classList.add("your-marker");
      }
    }
    if (flag) {
      setTimeout(() => {
        this.forceUpdate();
      }, 500);
    }
  }
  render() {
    var UserMarkers = [];
    var HospMarkers = [];
    var i;

    // for (i = 0; i < this.props.UserPoints.length; i++) {
    //   UserMarkers.push({
    //     position: [this.props.UserPoints[i].lat, this.props.UserPoints[i].lng],
    //     draggable: false,
    //     title: "User",
    //   });
    // }
    UserMarkers.push({
      position: [this.props.UserLat, this.props.UserLng],
      draggable: false,
      title: "Your Location",
    });
    this.props.HospitalPoints.forEach((ele) => {
      HospMarkers.push({
        position: [ele.lat, ele.lng],
        draggable: false,
        title: ele.name,
      });
    });
    return (
      <div id="res-Map">
        <MapMyIndia
          height="300px"
          zoom="8"
          markers={[...HospMarkers, ...UserMarkers]}
        />
      </div>
    );
  }
}

export default Map;
