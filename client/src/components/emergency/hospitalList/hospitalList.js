import React from "react";

class HospitalList extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    var hospListjsx = [];

    this.props.list.forEach((ele, slno) => {
      hospListjsx.push(
        <tr>
          <th scope="row">{slno + 1}</th>
          <td>{ele.name}</td>
          <td>{ele.email}</td>
          <td>
            {ele.location.poi +
              ", " +
              ele.location.street +
              ", " +
              ele.location.subSubLocality +
              ", " +
              ele.location.subLocality +
              ", " +
              ele.location.locality +
              ", " +
              ele.location.village +
              ", " +
              ele.location.district +
              ", " +
              ele.location.subDistrict +
              ", " +
              ele.location.city +
              ", " +
              ele.location.state +
              ", " +
              ele.location.pincode}
          </td>
          <td>ele.distance</td>
        </tr>
      );
    });
    return (
      <table class="table table-bordered table-light hover">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email id</th>
            <th scope="col">Address</th>
            <th scope="col">Distance</th>
          </tr>
        </thead>
        <tbody>{hospListjsx}</tbody>
      </table>
    );
  }
}

export default HospitalList;
