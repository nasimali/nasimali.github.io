// src/components/Timeline.tsx
import React from "react";
import styles from "../css/Timeline.module.css";
import amexLogo from "../images/american_express_logo.jpeg";
import skyLogo from "../images/sky_logo.jpeg";

const getImageSrc = (imageUrl: string) => {
  switch (imageUrl) {
    case "sky_logo":
      return skyLogo;
    case "amex_logo":
      return amexLogo;
    // Add more cases if necessary
    default:
      return ""; // return an empty string or a default image
  }
};

const timelineData = [
  // Add your timeline data here
  {
    id: 1,
    position: "Software Developer",
    company: "Sky UK",
    year: "Jul 2019",
    yearEnd: "Aug 2022",
    description:
      "Working in an agile team for Now TV to develop and maintain micro-services responsible for CMS system used for Now TV, Peacock, Sky Go, and Sky Showtime. Throughout my time in Sky, I have been practicing TDD and continuous integration. The key technologies I have used in Sky include Java, Spring Boot, Junit, Spock, Maven, Gradle, Wiremock, JavaScript(React), Kubernetes, Kafka, Git and Jenkins.",
    imageUrl: "sky_logo",
  },
  {
    id: 2,
    position: "Engineer I",
    company: "American Express",
    year: "Aug 2022",
    yearEnd: "Present",
    description:
      "At American Express, I began my journey as a Java Backend Engineer, working with cutting-edge frameworks like Spring Webflux and employing CI/CD tools such as Jenkins and GitHub Actions. My commitment to growth and versatility enabled me to transition seamlessly into a Full Stack Developer role, where I expanded my expertise by learning and implementing frontend technologies like React, as well as testing tools such as Jest and Mocha.",
    imageUrl: "amex_logo",
  },
  // ...
];

const Timeline: React.FC = () => {
  return (
    <section className={styles.timelineSection} id="timeline">
      <h2 className={styles.title}>Experience</h2>
      <ul className={styles.timelineList}>
        {timelineData.map((timeline) => (
          <li key={timeline.id} className={styles.timelineItem}>
            <img
              src={getImageSrc(timeline.imageUrl)}
              alt={timeline.company}
              className={styles.timelineImage}
            />
            <h3>{timeline.position}</h3>
            <p>{timeline.company}</p>
            <p>
              {timeline.year} - {timeline.yearEnd}
            </p>
            <p>{timeline.description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Timeline;
