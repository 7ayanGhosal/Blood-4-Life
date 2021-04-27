import React, { Component } from "react";
import MapMyIndia from "mapmyindia-react";
import axios from "axios";

class Map extends Component {
  render() {
    return (
      <MapMyIndia
        key={this.props.key}
        height="250px"
        markers={[
          {
            position: [this.props.latitude, this.props.longitude],
            draggable: true,
            title: "Marker title",
            onClick: (e) => {
              // console.log("clicked ");
            },
            onDragend: (e) => {
              // console.log("dragged");
              this.props.dragHandler(e);
            },
          },
        ]}
      />
    );
  }
}

export default Map;
