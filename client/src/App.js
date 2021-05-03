import React from "react";
import axios from "axios";
import Navbar from "./components/navbar/navbar";
import Carousel from "./components/carousel/carousel";
import Hospital from "./components/hospital/hospital";
import FooterHome from "./components/footerHome/footerHome";
import User from "./components/user/user";
import AboutUs from "./components/aboutUs/aboutUs";
import ContactUs from "./components/contactUs/contactUs";

import Emergency from "./components/emergency/emergency";
import OurNetwork from "./components/ourNetwork/ourNetwork";
import HospitalSearch from "./components/hospitalSearch/hospitalSearch";
import faker from "faker";

import "./App.css";
import AuthContext from "./context/auth-context";

class App extends React.Component {
  static contextType = AuthContext;
  constructor(props) {
    super(props);
    this.state = {
      displayOTPBox: false,
      disableEmail: false,
      name: "",
      firstName: "",
      lastName: "",
      email: "",
      pass: "",
      gender: "",
      age: "",
      bloodGroup: "",
      bloodStock: {
        "A+": 0,
        "A-": 0,
        "B+": 0,
        "B-": 0,
        "AB+": 0,
        "AB-": 0,
        "O+": 0,
        "O-": 0,
      },
      rhFactor: "",
      page: "Home",
      isHospital: false,
      reqDonor: false,
      authenticated: false,
      events: {},
      location: {
        latitude: 0,
        longitude: 0,
        poi: "",
        street: "",
        subSubLocality: "",
        subLocality: "",
        locality: "",
        village: "",
        district: "",
        subDistrict: "",
        city: "",
        state: "",
        pincode: "",
        eloc: "",
      },
    };

    //CHANGE EMAIL (Changes the state)
    this.enableEmail = () => {
      this.setState({ displayOTPBox: false, disableEmail: false });
    };
    //EMAIL VERIFICATION (Email has email, isHospital)
    this.onEmailSubmit = (Email) => {
      if (Email.boxName === "SignupBox") {
        const body = { email: Email.email };
        axios.post("/emailVerification", body).then(
          (res) => {
            if (res.data === "Exists") {
              //Already exists
              this.setState({ displayOTPBox: "exists" });
            } else if (res.data === "False") {
              //error in nodemailer
              this.setState({ displayOTPBox: "false" });
            } else {
              //otp sent
              //start timer, show otp box

              this.setState({
                displayOTPBox: "true",
                disableEmail: true,
                email: Email.email,
                isHospital: Email.isHospital,
              });
            }
          },
          (error) => {
            console.log(error);
          }
        );
      } else if (Email.boxName === "ResetPassBox") {
        const body = { email: Email.email };

        axios.post("/resetPass/sendOTP", body).then(
          (res) => {
            if (res.data === "doesnotexist") {
              document.getElementById("ResetPassOTPBox").style.display =
                "block";
              document.getElementById("ResetPassOTPBox").innerHTML =
                "<h5 className='text-danger'>This Email Id doesn't exist</h5>";
            } else if (res.data === true) {
              //otp sent
              //start timer, show otp box

              this.context.resetPassEmail = Email.email;
              document.getElementById("ResetPassPasswordSetter").style.display =
                "block";
              document.getElementById("ResetPassEmail").disabled = "true";
              document.getElementById("ResetPassSubmit").disabled = "true";
            } else {
              //error in nodemailer
              document.getElementById("ResetPassOTPBox").style.display =
                "block";
              document.getElementById("ResetPassOTPBox").innerHTML =
                "<h5 className='text-danger'>Couldn't connect to server, please try again after sometime</h5>";
            }
          },
          (error) => {
            console.log(error);
          }
        );
      }
    };

    //OTP VERIFICATION
    this.onOTPSubmit = (OTP) => {
      const body = { otp: OTP.otp };
      axios.post("/otpVerification", body).then(
        (res) => {
          if (res.data === "False") {
            //Wrong OTP
            console.log("INVALID OTP");
          } else {
            //correct OTP
            //turn off signupbox
            document.getElementById("closeSignupBox").click();
            //turn on passwordSetter
            document.getElementById("passwordSetterModalButton").click();
          }
        },
        (error) => {
          console.log("ERROR IN OTP ONSUBMIT, App.js");
        }
      );
    };

    //password matching
    this.setPassword = (pass) => {
      this.setState({ pass: pass });
      //same passwords
      //turn off passwordSetter
      document.getElementById("closePasswordBox").click();
      //turn on profileSetter
      document.getElementById("profileSetterModalButton").click();
    };
    //profileSetter
    this.setProfile = async (profile) => {
      await this.setState({
        name: profile.name,
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,
        age: profile.age,
        bloodGroup: profile.bloodGroup,
        rhFactor: profile.rhFactor,
        reqDonor: profile.reqDonor,
      });
      //turn off profilesetter
      document.getElementById("closeProfileSetterModal").click();
      //turn on placepicker
      document.getElementById("openSignupPlacepickerModal").click();
    };

    this.signup = async (location) => {
      await this.setState({
        location: location,
      });
      //turn off placepicker
      document.getElementById("closeSignupPlacepickerModal").click();
      axios.post("/signup", this.state).then(
        (res) => {
          if (res.data) {
            document.getElementById("closeProfileSetterModal").click();
            this.setState({ authenticated: true });
          } else
            console.log(
              "from App.js, there is some error in index.js(backend)"
            );
        },
        (error) => {
          console.log("app.js: Error in /signup" + error);
        }
      );
    };

    //PROFILE RESET
    this.resetProfile = (profile) => {
      axios.post("/resetprofile", profile).then((res) => {
        if (!res.data) {
          console.log("ERROR IN CHANGING VALUE!!");
        } else {
          this.setState({ ...profile });
          document.getElementById(profile.close).click();
        }
      });
    };
    //LOGIN ROUTE
    this.checkLogin = (cred) => {
      document.getElementById("closeLoginModal").click();
      axios.post("/login", cred).then((res) => {
        // console.log(res.data);
        if (!res.data) {
          document.getElementById("openLoginModal").click();
          document.getElementById("loginMessage").innerHTML =
            "<h5 className='text-danger'>Incorrect Details!</h5>";
        } else {
          // document.getElementById("loginMessage").innerHTML =
          //   "<h5 className='text-danger'>Logging In...</h5>";
          var IsHospital = false;
          if (res.data.data.name) IsHospital = true;
          this.setState({
            authenticated: true,
            ...res.data.data,
            events: res.data.event,
            isHospital: IsHospital,
          });
          this.pageHandler("Home");
        }
      });
    };

    //LOGGING OUT USER
    this.logout = () => {
      this.setState({
        displayOTPBox: false,
        disableEmail: false,
        firstName: "",
        lastName: "",
        email: "",
        pass: "",
        gender: "",
        age: "",
        address: "",
        bloodGroup: "",
        rhFactor: "",
        isHospital: false,
        reqDonor: "",
        authenticated: false,
      });
      this.pageHandler("Home");
    };

    //METHOD FOR REMOVING INFO FROM MODALS
    this.remove = () => {
      this.setState({
        displayOTPBox: false,
        disableEmail: false,
      });
    };

    //Method for changing main content on screen
    this.pageHandler = (Page) => {
      this.setState({ page: Page });
    };

    //Passsword Reset Route
    this.checkResetPassword = (pass) => {
      this.context.resetPassPassword = pass;
      document.getElementById("ResetPassOTPBox").style.display = "block";
      document.getElementById("ResetPassPasswordSetter").style.display = "none";
    };
    this.resetPassword = (OTP) => {
      const body = {
        email: this.context.resetPassEmail,
        password: this.context.resetPassPassword,
        otp: OTP.otp,
      };
      axios.post("/resetPass/otpVerification", body).then(
        (res) => {
          if (res.data === "InvalidOTP") {
            //Wrong OTP
            document.getElementById("ResetPassOTPBoxMessage").innerText =
              "Invalid OTP!!!";
          } else {
            //correct OTP
            //this.setState({ displayOTPBox: false, disableEmail: false });
            document.getElementById("closeResetPassBox").click();
            var IsHospital = false;
            if (res.data.name) IsHospital = true;
            this.setState({
              authenticated: true,
              ...res.data,
              isHospital: IsHospital,
            });
            this.pageHandler("Home");
          }
        },
        (error) => {
          console.log("ERROR IN OTP ONSUBMIT, App.js" + error);
        }
      );
    };
    //Blood stock updater
    this.updateStock = (stock) => {
      this.setState({
        bloodStock: {
          ["A+"]: stock.bloodStock["A+"],
          ["B+"]: stock.bloodStock["B+"],
          ["AB+"]: stock.bloodStock["AB+"],
          ["O+"]: stock.bloodStock["O+"],
          ["A-"]: stock.bloodStock["A-"],
          ["B-"]: stock.bloodStock["B-"],
          ["AB-"]: stock.bloodStock["AB-"],
          ["O-"]: stock.bloodStock["O-"],
        },
      });
      axios.post("/hospital/updatestock", stock);
    };

    //ORGANISE BLOOD CAMP EVENT
    this.organiseCamp = (camp) => {
      axios.post("/hospital/organiseCamp", camp).then(
        (res) => {
          if (res != false) {
            document.getElementById("eventMessage").innerHTML =
              "<h4>Event Created Successfully</h4>";
            this.setState((prevState) => {
              var events = prevState.events;
              events.push(res.data);
              return {
                events: events,
              };
            });
          } else {
            document.getElementById("eventMessage").innerHTML =
              "<h4>Couldn't Create Event, Try After Sometime!</h4>";
          }
        },
        (err) => {
          document.getElementById("eventMessage").innerHTML =
            "<h4>Couldn't Create Event, Try After Sometime!</h4>";
        }
      );
    };

    //EMERGENCY
    this.emergency = (body) => {
      axios.post("/emergency", body).then(
        (res) => {
          // console.log(res);
          var html = "";
          for (var i = 0; i < res.data.length; i++) {
            html +=
              "<h5>Name: " +
              res.data[i].name +
              "</h5><br/><h5>Distance: " +
              res.data[i].distance +
              " KM</h5><br/><br/>";
          }
          document.getElementById("NearbyHospitals").innerHTML = html;
        },
        (err) => {
          console.log(err);
        }
      );
    };

    // Fake Hospitals
    this.fakeHospitals = (count) => {
      var coord = [
        { a: 2, b: 14, c: 6, d: 74 },
        { a: 2, b: 16, c: 6, d: 74 },
        { a: 2, b: 18, c: 6, d: 74 },
        { a: 2, b: 20, c: 6, d: 74 },
        { a: 2, b: 22, c: 6, d: 74 },
        { a: 2, b: 24, c: 6, d: 74 },
        { a: 2, b: 26, c: 6, d: 74 },
        { a: 2, b: 28, c: 6, d: 74 },
        { a: 2, b: 22, c: 4, d: 70 },
        { a: 4, b: 24, c: 2, d: 72 },
        { a: 3, b: 33, c: 4, d: 74 },
        { a: 4, b: 10, c: 2, d: 76 },
        { a: 4, b: 10, c: 2, d: 78 },
        { a: 3, b: 22, c: 4, d: 80 },
        { a: 3, b: 25, c: 4, d: 80 },
        { a: 3, b: 22, c: 4, d: 84 },
        { a: 3, b: 25, c: 4, d: 84 },
        { a: 4, b: 18, c: 2, d: 80 },
        { a: 4, b: 18, c: 2, d: 82 },
        { a: 4, b: 24, c: 2, d: 92 },
        { a: 2, b: 26, c: 2, d: 70 }, //a
        { a: 2, b: 30, c: 4, d: 75 }, //b
        { a: 2, b: 16, c: 2, d: 80 }, //c
        { a: 2, b: 26, c: 4, d: 80 }, //d
        { a: 2, b: 20, c: 2, d: 84 }, //e
        { a: 2, b: 26, c: 2, d: 94 }, //f
      ];
      for (var i = 0; i < count; i++) {
        var index = Math.floor(Math.random() * coord.length);
        index = index % coord.length;
        var lat = (Math.random() * coord[index].a + coord[index].b).toFixed(4);
        var lng = (Math.random() * coord[index].c + coord[index].d).toFixed(4);
        axios.get("/map/getEloc/" + lat + "/" + lng).then(
          (res) => {
            // console.log(res);
            axios.get("/map/eloc/" + res.data).then(
              (Res) => {
                console.log(Res.data);
                var location = {
                  latitude: Res.data.lat,
                  longitude: Res.data.long,
                  poi: Res.data.poi,
                  street: Res.data.street,
                  subSubLocality: Res.data.subSubLocality,
                  subLocality: Res.data.subLocality,
                  locality: Res.data.locality,
                  village: Res.data.village,
                  district: Res.data.district,
                  subDistrict: Res.data.subDistrict,
                  city: Res.data.city,
                  state: Res.data.state,
                  pincode: Res.data.pincode,
                  eloc: res.data,
                };
                var name = faker.company.companyName();
                var newHospital = {
                  name: name + " Hospital",
                  email:
                    name +
                    String(Math.floor(Math.random() * 1000)) +
                    "@xyz.com",
                  password: "bloodforlife",
                  location: location,
                  bloodStock: {
                    "A+": Math.floor(Math.random() * 30),
                    "A-": Math.floor(Math.random() * 30),
                    "B+": Math.floor(Math.random() * 30),
                    "B-": Math.floor(Math.random() * 30),
                    "AB+": Math.floor(Math.random() * 30),
                    "AB-": Math.floor(Math.random() * 30),
                    "O+": Math.floor(Math.random() * 30),
                    "O-": Math.floor(Math.random() * 30),
                  },
                };
                axios.post("/hospital/fake", newHospital).then(
                  (res) => {
                    console.log("FakeHosp");
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              },
              (Err) => {
                console.log(Err);
                // break;
              }
            );
          },
          (err) => {
            console.log(err);
            // break;
          }
        );
      }
    };

    this.fakeUsers = (count) => {
      var bloodgrp = ["A", "B", "AB", "O"];
      var coord = [
        { a: 2, b: 14, c: 6, d: 74 },
        { a: 2, b: 16, c: 6, d: 74 },
        { a: 2, b: 18, c: 6, d: 74 },
        { a: 2, b: 20, c: 6, d: 74 },
        { a: 2, b: 22, c: 6, d: 74 },
        { a: 2, b: 24, c: 6, d: 74 },
        { a: 2, b: 26, c: 6, d: 74 },
        { a: 2, b: 28, c: 6, d: 74 },
        { a: 2, b: 22, c: 4, d: 70 },
        { a: 4, b: 24, c: 2, d: 72 },
        { a: 3, b: 33, c: 4, d: 74 },
        { a: 4, b: 10, c: 2, d: 76 },
        { a: 4, b: 10, c: 2, d: 78 },
        { a: 3, b: 22, c: 4, d: 80 },
        { a: 3, b: 25, c: 4, d: 80 },
        { a: 3, b: 22, c: 4, d: 84 },
        { a: 3, b: 25, c: 4, d: 84 },
        { a: 4, b: 18, c: 2, d: 80 },
        { a: 4, b: 18, c: 2, d: 82 },
        { a: 4, b: 24, c: 2, d: 92 },
        { a: 2, b: 26, c: 2, d: 70 }, //a
        { a: 2, b: 30, c: 4, d: 75 }, //b
        { a: 2, b: 16, c: 2, d: 80 }, //c
        { a: 2, b: 26, c: 4, d: 80 }, //d
        { a: 2, b: 20, c: 2, d: 84 }, //e
        { a: 2, b: 26, c: 2, d: 94 }, //f
      ];
      for (var i = 0; i < count; i++) {
        var index = Math.floor(Math.random() * coord.length);
        index = index % coord.length;
        var lat = (Math.random() * coord[index].a + coord[index].b).toFixed(4);
        var lng = (Math.random() * coord[index].c + coord[index].d).toFixed(4);
        axios.get("/map/getEloc/" + lat + "/" + lng).then(
          (res) => {
            // console.log(res);
            axios.get("/map/eloc/" + res.data).then(
              (Res) => {
                console.log(Res.data);
                var location = {
                  latitude: Res.data.lat,
                  longitude: Res.data.long,
                  poi: Res.data.poi,
                  street: Res.data.street,
                  subSubLocality: Res.data.subSubLocality,
                  subLocality: Res.data.subLocality,
                  locality: Res.data.locality,
                  village: Res.data.village,
                  district: Res.data.district,
                  subDistrict: Res.data.subDistrict,
                  city: Res.data.city,
                  state: Res.data.state,
                  pincode: Res.data.pincode,
                  eloc: res.data,
                };

                var firstName = faker.name.firstName();
                var lastName = faker.name.lastName();
                var newUser = {
                  firstName: firstName,
                  lastName: lastName,
                  email:
                    firstName +
                    String(Math.floor(Math.random() * 1000)) +
                    "@xyz.com",
                  password: "bloodforlife",
                  location: location,
                  age: Math.floor(Math.random() * 80 + 10),
                  gender: Math.round(Math.random()) ? "Male" : "Female",
                  bloodGroup: bloodgrp[Math.floor(Math.random() * 4) % 4],
                  rhFactor: Math.round(Math.random()) ? "Positive" : "Negative",
                  reqDonor: true,
                };
                axios.post("/user/fake", newUser).then(
                  (res) => {
                    console.log("FakeUser");
                  },
                  (err) => {
                    console.log(err);
                  }
                );
              },
              (Err) => {
                console.log(Err);
                // break;
              }
            );
          },
          (err) => {
            console.log(err);
            // break;
          }
        );
      }
    };
  }

  render() {
    var box = null;
    switch (this.state.page) {
      case "Home":
        box = (
          <div>
            <Carousel></Carousel>
            {/* <HospitalSearch></HospitalSearch> */}
          </div>
        );
        break;
      case "Emergency":
        box = <Emergency></Emergency>;
        break;
      case "About Us":
        box = <AboutUs></AboutUs>;
        break;
      case "Contact Us":
        box = <ContactUs></ContactUs>;
        break;
      case "Profile":
        if (this.state.authenticated) {
          if (this.state.isHospital) box = <Hospital></Hospital>;
          else box = <User></User>;
        }
        break;
      default:
        box = <Carousel></Carousel>;
    }
    return (
      <div>
        <img class="bodyImg" src="https://wallpapercave.com/wp/wp4323580.png" />
        <div class="bodyImgColor" />
        <AuthContext.Provider
          value={{
            ...this.state,
            onEmailSubmit: this.onEmailSubmit,
            onOTPSubmit: this.onOTPSubmit,
            enableEmail: this.enableEmail,
            setPassword: this.setPassword,
            setProfile: this.setProfile,
            checkLogin: this.checkLogin,
            logout: this.logout,
            remove: this.remove,
            resetProfile: this.resetProfile,
            checkResetPassword: this.checkResetPassword,
            resetPassword: this.resetPassword,
            pageHandler: this.pageHandler,
            signup: this.signup,
            updateStock: this.updateStock,
            organiseCamp: this.organiseCamp,
            emergency: this.emergency,
          }}
        >
          <Navbar></Navbar>
          {box}
        </AuthContext.Provider>

        {/* <PlacePicker></PlacePicker> */}
        <OurNetwork></OurNetwork>

        <FooterHome></FooterHome>
        <button onClick={() => this.fakeHospitals(2)}>fakeHosp</button>
        <button onClick={() => this.fakeUsers(2)}>fakeUser</button>
      </div>
    );
  }
}

export default App;
