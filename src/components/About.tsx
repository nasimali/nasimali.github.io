// src/components/About.tsx
import React from "react";
import styles from "../css/About.module.css";

const About: React.FC = () => {
  return (
    <section className={styles.aboutSection} id="about">
      <div className={styles.aboutContent}>
        <h2 className={styles.title}>About Me</h2>
        <p className={styles.description}>
          I am a highly dedicated and hard-working individual who began my
          academic journey in computer science at the young age of 16. Now, as a
          proficient full-stack engineer, I have gained experience in a diverse
          array of programming languages, including Java, HTML, JavaScript
          (React), PostgreSQL, and Kotlin. My expertise as a full-stack engineer
          allows me to seamlessly navigate between front-end and back-end
          development, enabling me to efficiently tackle complex projects and
          provide well-rounded solutions. Driven by an insatiable desire to
          expand my knowledge and skills, I continually seek new opportunities
          to learn and grow, both personally and professionally. My passion for
          technology, coupled with my commitment to excellence, empowers me to
          confidently overcome challenges and contribute significantly to the
          success of any project I am involved in.
        </p>
      </div>
    </section>
  );
};

export default About;
