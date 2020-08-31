import React from 'react';
import "./assets/styles/about.css";
import pic from "../../assets/img/profile_pic.png";
import aboutUs from "../../assets/img/about_us.png";

const About = () =>(
  <div className="about">
    <div className="about-us-intro">
      <span>A little bit</span>
      <img src={aboutUs} alt="About us"></img>
    </div>

    <section className="section-1 section section-content padding-left-1">
      Hey there! Christopher here! I'm from Germany and I am a computer science student at the university of Heidelberg, Germany.
      Although I had some difficulties in the beginning, I have been working hard on the hardware radio in order to make it pretty and useful again.
      And.. turns out it's payed out!
      <img src={pic} alt="hello"></img>
    </section>
    <section className="section-2 section section-content  padding-left-1">
       Hi, my name is Yordan and I'm from Bulgaria. I was born in Stara Zagora, a city right in the middle of the land.
       Right now I'm studying mathematics at the university of Heidelberg, Germany. I strive for a bachelor degree and I'm half way there.
       I'm participating in this project as part of my software praktikum. I was responsible for the development of the virtual radio frontend.
       My interests involve web development, regression and interpolation as well as russian literature. I am also an active chess player.

       <img src={pic} alt="hello"></img>
    </section>
    <section className="section-3 section section-content padding-left-1">
       Good day from me as well! I am Lennart and I'm also part of the project.
       I'm from Germany and I'm studying computer science in the same university as the others. I developed the backend side of the project and I'm happy to see the results of the work we put in.
        I would love to see that the new generation appreciates it too, especially the hardware radio.
       <img src={pic} alt="hello"></img>
    </section>
  </div>

);

export default About;
