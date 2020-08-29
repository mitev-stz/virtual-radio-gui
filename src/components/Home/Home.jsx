import React from 'react';
import './assets/styles/home.css';
import projectPlanOverView from "../../assets/img/project_plan_review.png";
import hardwareRadio from "../../assets/img/hardware-radio.jpeg";
import virtualRadio from "../../assets/img/virtual_radio.png";
import backend from "../../assets/img/backend_image.png";

class Home extends React.Component {
  render() {
    return (
      <div className="home centered-container">
          <div className="home-title">
            <div>
              The Radio Project
                <div className="slogan">
                  Computer science for the new generations.
                </div>
            </div>
          </div>
          <section className="home-info-content">
            <div>
              Our project consists of building a client which delivers informative material for the history of computer science to the new generations.
              We split up our project in 3 parts and we have now 2 clients and a backend application.
              A real old radio and a virtual radio which mimics it, broadcast different speeches regarding computer science at different frequencies.
              Our backend is an API which serves the needed audio files to the client.
            </div>
              <div className="project-shema">
                <img src={projectPlanOverView} alt="Project shema"></img>
              </div>
          </section>
        <section className="section-1 section">
          <div className="section-title">The Hardware Radio</div>
          <div className="section-content">
              <div className="section-intro">
                This is some content.
              </div>

              <div className="hardware-radio-img">
                <img src={hardwareRadio} alt="The old radio"></img>
              </div>
              <div className="clickables-container">
                <div className="milestones-clickable">
                  <span className="clickable" onClick={this.clickableOnClick}>Milestones history</span>

                  <div className="hidden">
                      <ul>
                        <li>
                          11.05. - First backend API for testing (Backend)
                        </li>
                        <li>
                          18.05. - Radio hardware items delivered (Physical Radio)
                        </li>
                        <li>
                          25.05. - First working prototype (Virtual Radio)
                        </li>
                        <li>
                          01.06. - Finished hardware modifications (Physical Radio)
                        </li>
                        <li>
                          01.06. - Finished backend API (Backend)
                        </li>
                        <li>
                          15.06. - Finished Admin-Interface (Backend)
                        </li>
                        <li>
                          15.06. - Finished virtual radio functions (Virtual Radio)
                        </li>
                        <li>
                          15.06. - Finished physical radio functions (Physical Radio)
                        </li>
                        <li>
                        22.06. - Finished virtual radio styling (Virtual Radio)
                        </li>
                      </ul>
                  </div>
                </div>

                <div className="challenges-clickable">
                  <span className="clickable"  onClick={this.clickableOnClick}>Challenges on the road</span>
                  <div className="hidden"> challenes </div>
                </div>
                <div className="purpose-clickable">
                  <span className="clickable"  onClick={this.clickableOnClick}>Purpose</span>
                  <div className="hidden"> purpose</div>
                </div>
              </div>
          </div>
        </section>
        <section className="section-2 section">
          <div className="section-title">The Virtual Radio</div>
          <div className="section-content">
              <div className="section-intro">
                Some content here...
              </div>

              <div className="virtual-radio-img">
                <img src={virtualRadio} alt="The virtual radio"></img>
              </div>
              <div className="clickables-container">
                <div className="milestones-clickable">
                  <span className="clickable" onClick={this.clickableOnClick}>Milestones history</span>

                  <div className="hidden">
                      <ul>
                        <li>
                          11.05. - First backend API for testing (Backend)
                        </li>
                        <li>
                          18.05. - Radio hardware items delivered (Physical Radio)
                        </li>
                        <li>
                          25.05. - First working prototype (Virtual Radio)
                        </li>
                        <li>
                          01.06. - Finished hardware modifications (Physical Radio)
                        </li>
                        <li>
                          01.06. - Finished backend API (Backend)
                        </li>
                        <li>
                          15.06. - Finished Admin-Interface (Backend)
                        </li>
                        <li>
                          15.06. - Finished virtual radio functions (Virtual Radio)
                        </li>
                        <li>
                          15.06. - Finished physical radio functions (Physical Radio)
                        </li>
                        <li>
                        22.06. - Finished virtual radio styling (Virtual Radio)
                        </li>
                      </ul>
                  </div>
                </div>
                <div className="challenges-clickable">
                  <span className="clickable"  onClick={this.clickableOnClick}>Challenges on the road</span>
                  <div className="hidden"> challenges</div>
                </div>
                <div className="purpose-clickable">
                  <span className="clickable" onClick={this.clickableOnClick}>Purpose</span>
                  <div className="hidden"> purposee</div>
                </div>
              </div>
          </div>
        </section>
        <section className="section-3 section">
          <div className="section-title">The Server Backend</div>
          <div className="section-content">
              <div className="section-intro">
                Some content here...
              </div>

              <div className="virtual-radio-img">
                <img src={backend} alt="The server backend"></img>
              </div>
              <div className="clickables-container">
                <div className="milestones-clickable">
                  <span className="clickable"  onClick={this.clickableOnClick}>Milestones history</span>

                  <div className="hidden">
                      <ul>
                        <li>
                          11.05. - First backend API for testing (Backend)
                        </li>
                        <li>
                          18.05. - Radio hardware items delivered (Physical Radio)
                        </li>
                        <li>
                          25.05. - First working prototype (Virtual Radio)
                        </li>
                        <li>
                          01.06. - Finished hardware modifications (Physical Radio)
                        </li>
                        <li>
                          01.06. - Finished backend API (Backend)
                        </li>
                        <li>
                          15.06. - Finished Admin-Interface (Backend)
                        </li>
                        <li>
                          15.06. - Finished virtual radio functions (Virtual Radio)
                        </li>
                        <li>
                          15.06. - Finished physical radio functions (Physical Radio)
                        </li>
                        <li>
                        22.06. - Finished virtual radio styling (Virtual Radio)
                        </li>
                      </ul>
                  </div>
                </div>
                <div className="challenges-clickable">
                  <span className="clickable"  onClick={this.clickableOnClick}> Challenges on the road</span>
                  <div className="hidden"> challenges</div>
                </div>
                <div className="purpose-clickable">
                  <span className="clickable"  onClick={this.clickableOnClick}>Purpose</span>
                  <div className="hidden"> purpose</div>
                </div>
              </div>
          </div>
        </section>
      </div>
    );
  }

  clickableOnClick = (e) => {
    let element = e.target.parentNode.lastElementChild;
    if(element.classList.contains("hidden")) element.classList.remove("hidden")
    else element.classList.add("hidden");
  }
}

export default Home;
