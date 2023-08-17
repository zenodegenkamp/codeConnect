import React from "react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";

export default function About() {
  return (
    <div className="about-page-container">
      <div className="about-page-spline">
        <Spline scene="https://prod.spline.design/UW8H7quzv7TEYgdB/scene.splinecode" />
      </div>

      <div className="about-page-content">
        <h1>
          Bridging beginners to{" "}
          <span className="highligted-text">real projects</span>
        </h1>
        <p className="about-page-text-gray">
          At CodeConnect, we're passionate about practical coding education. Our
          platform bridges beginners to real projects, fostering growth for
          programmers and aiding businesses. We embrace collaboration, nurturing
          a culture of learning. Join us today to unleash the potential of
          hands-on learning and shape your tech future!
        </p>
        <Link className="about-page-button" to="/vans">
          Explore the projects
        </Link>
      </div>
    </div>
  );
}
