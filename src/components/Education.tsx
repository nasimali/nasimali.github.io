import React, { useState } from "react";
import styles from "../css/Education.module.css";
import gladesmoreLogo from "../images/gladesmore_logo.png";
import kclLogo from "../images/kcl_logo.png";
import achievementData from "../resources/Achievements.json";
import educationData from "../resources/Education.json";

interface AchievementProps {
  achievement: {
    id: number;
    name: string;
    date: string;
    certificationUrl?: string;
    details: string;
  };
}

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

const AchievementItem: React.FC<AchievementProps> = ({ achievement }) => {
  const [flip, setFlip] = useState(false);

  const handleFlip = () => {
    setFlip(!flip);
  };

  return (
    <li
      key={achievement.id}
      className={`${styles.achievementItem} ${flip ? styles.flip : ""}`}
      onClick={() => {
        if (achievement.details) {
          handleFlip();
        }
      }}
    >
      {achievement.details && (
        <i className={`fa-solid fa-rotate ${styles.icon}`}></i>
      )}
      <div className={styles.front}>
        <h3>{achievement.name}</h3>
        <p>{achievement.date}</p>
        {achievement.certificationUrl && (
          <a
            href={achievement.certificationUrl}
            onClick={(event) => {
              event.stopPropagation();
            }}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className={styles.certificationBox}>Show Credentials</div>
          </a>
        )}
      </div>
      <div className={styles.back}>
        <p className={styles.achievementDetails}>{achievement.details}</p>
      </div>
    </li>
  );
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
          <AchievementItem key={achievement.id} achievement={achievement} />
        ))}
      </ul>
    </section>
  );
};

export default Education;
