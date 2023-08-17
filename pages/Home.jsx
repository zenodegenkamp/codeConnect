import React from "react";
import { Link } from "react-router-dom";
import Spline from "@splinetool/react-spline";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLaptopCode,
  faUsers,
  faLightbulb,
} from "@fortawesome/free-solid-svg-icons";

export default function Home() {
  return (
    <>
      <div className="home-section">
        <div className="home-section-text">
          <h1>
            Boost your <span className="highligted-text">Carreer</span>
          </h1>
          <p className="home-section-text-gray max-width">
            We offer starting devs a possibility to learn through meaningful
            projects, collaborate with pros, conquer real challenges, build your
            portfolio!
          </p>
          <Link className="home-section-button" to="vans">
            Discover Projects
          </Link>
        </div>
        <div className="home-section-spline">
          <Spline
            className="spline"
            scene="https://prod.spline.design/DfnEI2jU5sZ79h9t/scene.splinecode"
          />
        </div>
      </div>
      <div className="home-section-advantages">
        <h1 className="advantage">
          Hands on learning<br></br>
          <FontAwesomeIcon className="home-icon" icon={faLaptopCode} />
        </h1>
        <h1 className="advantage">
          Work with professionals<br></br>{" "}
          <FontAwesomeIcon className="home-icon" icon={faUsers} />
        </h1>
        <h1 className="advantage">
          Tackling real challanges <br></br>
          <FontAwesomeIcon className="home-icon" icon={faLightbulb} />
        </h1>
      </div>
    </>
  )
}
