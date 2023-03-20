import React from "react";
import styles from "../css/Education.module.css";
import gladesmoreLogo from "../images/gladesmore_logo.png";
import kclLogo from "../images/kcl_logo.png";
import achievementData from "../resources/Achievements.json";
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
      <h2 className={styles.title}>Achievements</h2>
      <ul className={styles.achievementList}>
        {achievementData.map((achievement) => (
          <li key={achievement.id} className={styles.achievementItem}>
            <h3>{achievement.name}</h3>
            <p>{achievement.date}</p>
            {achievement.certificationUrl && (
              <a
                href={achievement.certificationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className={styles.certificationBox}>Show Credentials</div>
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Education;
