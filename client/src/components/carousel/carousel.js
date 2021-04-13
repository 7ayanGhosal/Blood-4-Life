import React, { Component } from "react";
import img1 from "../../../src/resources/img1.jpg";
import img2 from "../../../src/resources/img2.jpg";
import img3 from "../../../src/resources/img3.jpg";
import img4 from "../../../src/resources/img4.jpg";
import img5 from "../../../src/resources/img5.jpg";
import img6 from "../../../src/resources/img6.png";
import img7 from "../../../src/resources/img7.jpg";
import img8 from "../../../src/resources/img8.jpeg";
import img9 from "../../../src/resources/img9.jpeg";
import img10 from "../../../src/resources/img10.jpg";
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
              <button
                type="button"
                data-bs-target="#carouselExampleIndicators"
                data-bs-slide-to="9"
                aria-label="Slide 10"
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

                   backgroundImage: "url(" + img2 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>

              <div
                style={{
                  height: 60 + "vh",

                   backgroundImage: "url(" + img3 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>

              <div
                style={{
                  height: 60 + "vh",

                   backgroundImage: "url(" + img4 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
                            <div
                style={{
                  height: 60 + "vh",

                   backgroundImage: "url(" + img5 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                   backgroundImage: "url(" + img6 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                   backgroundImage: "url(" + img7 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                   backgroundImage: "url(" + img8 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                   backgroundImage: "url(" + img9 + ")",
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
                class="carousel-item"
              ></div>
              <div
                style={{
                  height: 60 + "vh",

                   backgroundImage: "url(" + img10 + ")",
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
