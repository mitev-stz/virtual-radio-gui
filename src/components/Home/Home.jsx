import React from 'react';
import './assets/styles/home.css';
import projectPlanOverView from "../../assets/img/project_plan_review.png";
import hardwareRadio from "../../assets/img/hardware-radio.jpeg";

class Home extends React.Component {
  render() {
    return (
      <div className="home centered-container">
          <div className="home-title">
            <div>
              The Radio Project
                <div className="slogan">
                  "...because getting involved is important."
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
              <div className="project-plan-overview">
                <img src={projectPlanOverView} alt="Project plan overview"></img>
              </div>
          </section>
        <section className="section-1 section">
          <div className="section-title">The Hardware Radio</div>
          <div className="section-content">
              <div className="hardware-radio-img">
                <img src={hardwareRadio} alt="The old radio"></img>
              </div>
              <div className="clickables-container">
                <div className="milestones-clickable">
                  <span className="clickable">Milestones history</span>

                  <div className="milestones hardware-radio-milestones hidden">
                    <div className="milestones-ul">
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
                </div>
                <div className="challenges-clickable">
                  <span className="clickable">Challenges on the road</span>
                </div>
                <div className="purpose-clickable">
                  <span className="clickable">Purpose</span>
                </div>
              </div>
          </div>
        </section>
        <section className="section-2 section">
          The Virtual Radio
          <div className="virtual-radio-img">
            <img src={hardwareRadio} alt="The virtual radio"></img>
          </div>
          <div className="clickables-container">
            <div className="milestones-clickable">
              <span className="clickable text-underline">Milestones history</span>

              <div className="milestones virtual-radio-milestones hidden">
                <div className="milestones-ul">
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
            </div>
            <div className="challenges-clickable">
              <span className="clickable text-underline">Challenges on the road</span>
            </div>
            <div className="purpose-clickable">
              <span className="clickable text-underline">Purpose</span>
            </div>
          </div>
        </section>
        <section className="section-3 section">
          The Backend API
          <div className="hardware-radio-img">
            <img src={hardwareRadio} alt="The backend API"></img>
          </div>
          <div className="clickables-container">
            <div className="milestones-clickable">
              <span className="clickable text-underline">Milestones history</span>

              <div className="milestones hardware-radio-milestones hidden">
                <div className="milestones-ul">
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
            </div>
            <div className="challenges-clickable">
              <span className="clickable text-underline">Challenges on the road</span>
            </div>
            <div className="purpose-clickable">
              <span className="clickable text-underline">Purpose</span>
            </div>
          </div>
        </section>



      </div>
    );
  }
}

export default Home;
