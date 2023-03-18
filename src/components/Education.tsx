// src/components/Education.tsx
import React from "react";
import styles from "../css/Education.module.css";
import gladesmoreLogo from "../images/gladesmore_logo.png";
import kclLogo from "../images/kcl_logo.png";

const getImageSrc = (imageUrl: string) => {
  switch (imageUrl) {
    case "gladesmore_logo":
      return gladesmoreLogo;
    case "kcl_logo":
      return kclLogo;
    // Add more cases if necessary
    default:
      return ""; // return an empty string or a default image
  }
};

const educationData = [
  {
    id: 1,
    institution: "Gladesmore Community School",
    degree: "GCSE/BTEC Level 3 Ext Dip",
    year: "Sep 2010 - Jul 2015",
    imageUrl: "gladesmore_logo",
  },
  {
    id: 2,
    institution: "King's College London, University of London",
    degree: "Bachelor of Science in Computer Science with Management",
    year: "Sep 2015 - Sep 2019",
    imageUrl: "kcl_logo",
  },
];

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
