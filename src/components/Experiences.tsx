import React from "react";
import styles from "../css/Experiences.module.css";
import amexLogo from "../images/american_express_logo.jpeg";
import skyLogo from "../images/sky_logo.jpeg";
import experiencesData from "../resources/Experiences.json";

const getImageSrc = (imageUrl: string) => {
  switch (imageUrl) {
    case "sky_logo":
      return skyLogo;
    case "amex_logo":
      return amexLogo;
    default:
      return "";
  }
};

const Experiences: React.FC = () => {
  return (
    <section className={styles.timelineSection} id="timeline">
      <h2 className={styles.title}>Experiences</h2>
      <ul className={styles.timelineList}>
        {experiencesData.map((timeline) => (
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

export default Experiences;
