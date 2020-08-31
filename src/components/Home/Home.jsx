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
            <div className="padding-left-1">
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
                The very old hardware is controlled by a raspberry pi computer. Assets that we use are an a/d converter and a potentiometer.
                After the order of the needed hardware we did some planning for the development process.
                 We did remote development using a laptop running pycharm which deploys code to SFTP server. The code is then executed there and the output is on terminal
                Software part – We used ssh for configuring rasbian lite and created flowcharts(PAP) for the py software.
                A big difficulty was definitely creating a valid circuit diagram.
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
                  <div className="hidden">
                    The delivery of the needed items was postponed for a couple of weeks and at first we had to do more of a planning than writing stuff.
                    Another challenge was to find a clever way to install a potentiometer.
                  </div>
                </div>
                <div className="purpose-clickable">
                  <span className="clickable"  onClick={this.clickableOnClick}>Purpose</span>
                  <div className="hidden">
                    The old radio will be placed in the school area, where all the students get to use it freely for studying computer science.
                  </div>
                </div>
              </div>
          </div>
        </section>
        <section className="section-2 section">
          <div className="section-title">The Virtual Radio</div>
          <div className="section-content">
              <div className="section-intro">
                The virtual radio frontend was implemented using React and Bootstrap.
                Pipeline consists of 3 stages - build, test, deploy.
                We used heroku cloud platform for hosting the production build.
                The focus at the start of the project was to implement the basic functionality, the first working prototype and demo was on 13-07-20.
                At the end of July and in the beginning of August we developed a new radio design which was more consistent and easier to use.
                In the following weeks we did some implementation improvements and developed the information pages for the project.
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
                  <div className="hidden">
                     One of the biggest challenges on the road was definitely a good looking design model
                     which not only mimics the look and feel of the real old radio, but also assures a
                     good user experience when interacting with it. Figuring out the noise in between channels was also quite a trouble.
                   </div>
                </div>
                <div className="purpose-clickable">
                  <span className="clickable" onClick={this.clickableOnClick}>Purpose</span>
                  <div className="hidden">
                    The web is definitely one of the most comfortable placed to do your further studies once
                    you get involved in computer science, and so the virtual radio provides the students who came across
                    our hardware radio another place to do their studies.
                  </div>
                </div>
              </div>
          </div>
        </section>
        <section className="section-3 section">
          <div className="section-title">The Server Backend</div>
          <div className="section-content">
              <div className="section-intro">
                The backend serves audio files and channel info we want to host.
                Implementation using python django and djando admin framework for editing hosted data.
                We used Swagger for the api documentation.
                Pipeline consists of 3 stages - build, test, deploy
                There are 3 docker containers for 3 services that the backend provides – backend app, nginx service(routing and  serving static files), postgres for managing data
                The first working api was on 18-05-20.
                The first created tests had 85% coverage.
                There is also an automatic convertion of filetypes.
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
                  <div className="hidden"> Setting up nginx service for routing and serving static files, implementing CI/CD pipeline.</div>
                </div>
                <div className="purpose-clickable">
                  <span className="clickable"  onClick={this.clickableOnClick}>Purpose</span>
                  <div className="hidden"> This API provides both of the clients with the needed audio files and gives them some metadata in regards as well. There is an admin interface so one could easily add, remove of change the audio files.</div>
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
