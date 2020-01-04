import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
import firstImage from "assets/img/mn/image1.jpg";
import secondImage from "assets/img/mn/image2.jpg";
import thirdImage from "assets/img/mn/image3.jpg";

export default class MahiraPage extends Component {
  render() {
    return (
      <div>
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              style={{
                backgroundRepeat: "repeat-y"
              }}
              src={firstImage}
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src={secondImage}
              style={{
                top: "0",
                bottom: "0",
                left: "0",
                right: "0",
                maxWidth: "100%",
                maxHeight: "100%",
                margin: "auto",
                overflow: "auto"
              }}
              alt="Third slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" src={thirdImage} alt="Third slide" />
          </Carousel.Item>
        </Carousel>
        <h3 style={{ textAlign: "center" }}>
          I will ❤️ you till death do us part
        </h3>
        <p style={{ textAlign: "center" }}>
          You’re the only girl I will ❤and cherish for the rest of my life.
        </p>
        <p style={{ textAlign: "center" }}>
          আমি তোমাকে ছাড়া একটি পৃথিবী কল্পনা করতে পারি না
        </p>
      </div>
    );
  }
}
