import React, { Component } from "react";
import Map from "mapmyindia-react";
import "./placePicker.css";
import axios from "axios";

class PlacePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: 0,
      longitude: 0,
      location: "",
      results: [],
    };
    this.getUserLocation = () => {
      window.navigator.geolocation.getCurrentPosition(
        (res) => {
          this.setState({
            latitude: res.coords.latitude,
            longitude: res.coords.longitude,
          });
          console.log(this.state.latitude + " " + this.state.longitude);
        },
        (error) => {
          console.log(error);
        }
      );
    };

    this.pointLocation = (eloc) => {
      console.log(eloc);
      axios.get("/eloc/" + eloc).then((res) => {
        // console.log(res);
        this.setState({ latitude: res.data.lat, longitude: res.data.long });
      });
    };

    this.locationSubmit = (event) => {
      event.preventDefault();
      console.log(this.state.location);
      axios.get("/suggest/" + this.state.location).then((res) => {
        console.log(res);
        this.setState({ results: res.data });
        // var html = "";
        // for (var i = 0; i < res.data.length; i++) {
        //   html +=
        //     "<a onclick=this.print()>" +
        //     res.data[i].placeName +
        //     ", " +
        //     res.data[i].placeAddress +
        //     "</a> <br/>";
        // }

        // document.getElementById("suggestions").innerHTML = html;
      });
    };
    this.locationChange = (e) => {
      this.setState({ location: e.target.value });
    };
  }

  componentDidMount() {
    this.getUserLocation();
  }

  render() {
    var suggestions = [];
    for (var i = 0; i < this.state.results.length; i++) {
      var eloc = this.state.results[i].eLoc;
      suggestions.push(
        <h5
          onClick={() => {
            this.pointLocation(eloc);
          }}
        >
          {this.state.results[i].placeName +
            ", " +
            this.state.results[i].placeAddress}
        </h5>
      );
      suggestions.push(<br />);
    }
    return (
      <div>
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#placepickerModal"
        >
          Launch PlacePicker
        </button>
        <div
          class="modal fade"
          id="placepickerModal"
          data-bs-backdrop="static"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog modal-dialog-centered ">
            <div class="modal-content">
              <button
                id="closeLoginModal"
                type="button"
                class="btn-close modal-close-button"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={this.reset}
              ></button>
              <div class="modal-body">
                <h5>Pick your location</h5>
                <br />
                <form onSubmit={this.locationSubmit}>
                  <input
                    name="address"
                    type="text"
                    onChange={this.locationChange}
                    value={this.state.location}
                  ></input>
                  &emsp;
                  <button class="btn btn-success" type="submit">
                    Submit
                  </button>
                </form>
                <br></br>
                <div class="slist" id="suggestions">
                  {suggestions}
                </div>
                <br></br>
                <div id="map-details"></div>
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
          </div>
        </div>
      </div>
    );
  }
}

export default PlacePicker;
