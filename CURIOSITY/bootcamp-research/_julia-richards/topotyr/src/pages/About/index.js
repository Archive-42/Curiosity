import React from "react";
import "./About.css";

function About() {
  return (
    <React.Fragment>
      <div className="title-wrapper">
        <h2>About</h2>
      </div>
      <div className="About-card">
        <div className="text-wrap">
          <p>
            Topotyr is a digital map agency specializing in custom web maps, GIS
            services, and web design. It is our belief that mapping is an
            adventure, a catalyst for action and an aesthetic journey. We live
            and work at the intersection of bringing <strong>topo</strong>graphy
            to life and adventure, or även<strong>tyr</strong> in Swedish. We’d
            love to join you on your cartographic adventure, whether it’s
            creating a beautiful map for your wall or leveraging location
            intelligence to grow your business.
          </p>
          <p>
            Get in touch{" "}
            <a href="mailto:julia.m.richards@gmail.com" class="contact-link">
              here
            </a>
            .
          </p>
        </div>
      </div>
    </React.Fragment>
  );
}

export default About;
