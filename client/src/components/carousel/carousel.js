import React, { Component } from "react";
import "./carousel.css";

class Carousel extends Component {
  render() {
    return (
      <div>
        <div class="carouselDiv container">
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
            <div class="carousel-inner">
              <center>
                <div class="carousel-item active">
                  <img
                    src="https://wallpapercave.com/wp/wp4323457.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://image.freepik.com/free-vector/illustration-people-donating-blood_52683-22259.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>

                <div class="carousel-item">
                  <img
                    src="https://image.freepik.com/free-vector/blood-cells-red-background-medical-plasma-human-artery-hemoglobin-erythrocytes-hematology-medicine-red-blood-cells-vein-stream-body-vascular-system-cancer-microbiology-science_8071-1527.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>

                <div class="carousel-item">
                  <img
                    src="https://wallpapercave.com/wp/wp4323658.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://wallpapercave.com/wp/wp4323663.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://wallpapercave.com/wp/wp4323661.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://wallpapercave.com/wp/wp4323556.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://wallpapercave.com/wp/wp4323525.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>
                <div class="carousel-item">
                  <img
                    src="https://wallpapercave.com/wp/wp4323468.jpg"
                    class="d-block w-100 h-75 image"
                    alt="..."
                  />
                </div>
              </center>
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
