import React, {Component} from 'react';
import './profileModal.css';
import UserProfile from './userProfile/userProfile';
import HospitalProfile from './hospitalProfile/hospitalProfile';
import AuthContext from '../../../../context/auth-context';

class ProfileModal extends Component {
  static contextType = AuthContext;

  render() {
    var Box = null;
    console.log(this.context.isHospital);
    if (this.context.isHospital) Box = <HospitalProfile></HospitalProfile>;
    else Box = <UserProfile></UserProfile>;
    return Box;
  }
}

export default ProfileModal;
