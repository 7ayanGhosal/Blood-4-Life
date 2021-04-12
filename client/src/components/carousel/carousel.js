import React, { Component } from "react";
import img1 from "../../../src/resources/img1.jpg";
import "./carousel.css";

class Carousel extends Component {
  render() {
    return (
      <div>
        <div class="carouselDiv">
          <div
            id="carouselExampleIndicators"
            class="carousel slide"
            data-bs-ride="carousel"
          >
            <div class="carousel-indicators">
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="0"
                class="active"
                aria-current="true"
                aria-label="Slide 1"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="1"
                aria-label="Slide 2"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="2"
                aria-label="Slide 3"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="3"
                aria-label="Slide 4"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="4"
                aria-label="Slide 5"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="5"
                aria-label="Slide 6"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="6"
                aria-label="Slide 7"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="7"
                aria-label="Slide 8"
              ></button>
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="8"
                aria-label="Slide 9"
              ></button>
            </div>
            <div class="carousel-inner ">
              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage: "url(" + img1 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item active"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage:
                    "url('https://image.freepik.com/free-vector/illustration-people-donating-blood_52683-22259.jpg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>

              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage:
                    "url('https://image.freepik.com/free-vector/blood-cells-red-background-medical-plasma-human-artery-hemoglobin-erythrocytes-hematology-medicine-red-blood-cells-vein-stream-body-vascular-system-cancer-microbiology-science_8071-1527.jpg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>

              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage:
                    "url('https://wallpapercave.com/wp/wp4323658.jpg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage:
                    "url('https://wallpapercave.com/wp/wp4323663.jpg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage:
                    "url('https://wallpapercave.com/wp/wp4323661.jpg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage:
                    "url('https://wallpapercave.com/wp/wp4323556.jpg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage:
                    "url('https://wallpapercave.com/wp/wp4323525.jpg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                  backgroundImage:
                    "url('https://wallpapercave.com/wp/wp4323468.jpg')",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
            </div>
            <button
              class="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="prev"
            >
              <span
                class="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Previous</span>
            </button>
            <button
              class="carousel-control-next"
              type="button"
              data-bs-target="#carouselExampleIndicators"
              data-bs-slide="next"
            >
              <span
                class="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span class="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Carousel;
{
  /* <div
  style={{
    height: 60 + "vh",
    
  }}
  class="carousel-item active d-flex align-items-center justify-content-center"
>
  <img
    src="https://wallpapercave.com/wp/wp4323457.jpg"
    class="image"
    style={{ objectFit: "cover", objectPosition: "center" }}
    alt="..."
  />
</div>; */
}
