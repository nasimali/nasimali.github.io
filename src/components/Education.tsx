import React from "react";
import styles from "../css/Education.module.css";
import gladesmoreLogo from "../images/gladesmore_logo.png";
import kclLogo from "../images/kcl_logo.png";
import educationData from "../resources/Education.json";

const getImageSrc = (imageUrl: string) => {
  switch (imageUrl) {
    case "gladesmore_logo":
      return gladesmoreLogo;
    case "kcl_logo":
      return kclLogo;
    default:
      return "";
  }
};

const Education: React.FC = () => {
  return (
    <section className={styles.educationSection} id="education">
      <h2 className={styles.title}>Education</h2>
      <ul className={styles.educationList}>
        {educationData.map((education) => (
          <li key={education.id} className={styles.educationItem}>
            <img
              src={getImageSrc(education.imageUrl)}
              alt={education.institution}
              className={styles.educationImage}
            />
            <h3>{education.institution}</h3>
            <p>{education.degree}</p>
            <p>{education.year}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Education;
