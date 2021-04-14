import React, { Component } from "react";
import Map from "mapmyindia-react";
import "./placePicker.css";

class PlacePicker extends Component {
  state = {
    latitude: 0,
    longitude: 0,
  };
  getUserLocation = () => {
    window.navigator.geolocation.getCurrentPosition(
      (res) => {
        console.log(this.state.latitude + " " + this.state.longitude);
        this.setState({
          latitude: res.coords.latitude,
          longitude: res.coords.longitude,
        });
      },
      (error) => {
        console.log(error);
      }
    );
  };

  render() {
    this.getUserLocation();
    return (
      <div>
        <div id="map-details"></div>
        <div className="placePickerBox">
          <Map
            markers={[
              {
                position: [this.state.latitude, this.state.longitude],
                draggable: true,
                title: "Marker title",
                onClick: (e) => {
                  console.log("clicked ");
                },
                onDragend: (e) => {
                  // console.log(e);
                  document.getElementById("map-details").innerHTML =
                    "longitude: " +
                    e.target._latlng.lng +
                    " latitude: " +
                    e.target._latlng.lat;
                  // this.setState({longitude: e.sourceTarget., latitude: })
                },
              },
            ]}
          />
        </div>
      </div>
    );
  }
}

export default PlacePicker;

// import React, { Component } from "react";
// import Map from "mapmyindia-react";
// import "./placePicker.css";

// class PlacePicker extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       latitude: 0,
//       longitude: 0,
//     };
//     this.getUserLocation = () => {
//       window.navigator.geolocation.getCurrentPosition(
//         (res) => {
//           this.setState({
//             latitude: res.coords.latitude,
//             longitude: res.coords.longitude,
//           });
//           console.log(this.state.latitude + " " + this.state.longitude);
//         },
//         (error) => {
//           console.log(error);
//         }
//       );
//     };
//   }
//   componentDidMount() {
//     this.getUserLocation();
//   }

//   render() {
//     return (
//       <div className="placePickerBox">
//         <Map
//           markers={[
//             {
//               position: [this.state.longitude, this.state.latitude],
//               draggable: true,
//               title: "Marker title",
//               onClick: (e) => {
//                 console.log("clicked ");
//               },
//               onDragend: (e) => {
//                 //donot call setstate
//                 console.log(e.target._latlng);
//               },
//             },
//           ]}
//         />
//       </div>
//     );
//   }
// }

// export default PlacePicker;
