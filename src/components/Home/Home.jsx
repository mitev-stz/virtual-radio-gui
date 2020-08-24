import React from 'react';
import './assets/styles/home.css';
import projectPlanOverView from "../../assets/img/project_plan_review.png";

class Home extends React.Component {
  render() {
    return (
      <div className="home centered-container">
        <div className="home-title">
          Hey there! Welcome to our project!
        </div>
        <div className="project-plan-overview">
          <img src={projectPlanOverView} alt="Project plan overview"></img>
        </div>
        <div className="project-milestones">
          <div className="project-milestones-title">
            Project: ScienceRadio - Milestones
          </div>
          <div className="project-milestones-ul">
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
    );
  }
}

export default Home;
