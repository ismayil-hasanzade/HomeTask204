import { Button } from "antd";
import React from "react";

const NewsLetter = () => {
  return (
    <div id="NewsLetter">
      <div className="container">
        <div className="aboutcontainer">
          <h4>Newsletter</h4>
          <span>
            Subscribe to our newsletter and get 20% off your first purchase
          </span>
        </div>

        <form className="inputcontainer">
          <input required type="email" placeholder="Your Email" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>
  );
};

export default NewsLetter;
