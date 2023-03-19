import React from "react";
import styles from "../css/Interests.module.css";
import animePlaceholder from "../images/anime.jpg";
import codingPlaceholder from "../images/coding_placeholder.jpg";
import kickboxingPlaceholder from "../images/kickboxing_gloves_placeholder.jpg";
import technologyPlaceholder from "../images/technology_placeholder.jpg";
import interestsData from "../resources/Interests.json";

const getImageSrc = (imageUrl: string) => {
  switch (imageUrl) {
    case "technology":
      return technologyPlaceholder;
    case "coding":
      return codingPlaceholder;
    case "kickboxing":
      return kickboxingPlaceholder;
    case "anime":
      return animePlaceholder;
    default:
      return "";
  }
};

const Interests: React.FC = () => {
  return (
    <section className={styles.interestsSection} id="interests">
      <h2 className={styles.title}>Interests</h2>
      <div className={styles.interestsGrid}>
        {interestsData.map((interest) => (
          <div key={interest.id} className={styles.interestCard}>
            <img
              src={getImageSrc(interest.imageUrl)}
              alt={interest.title}
              className={styles.interestImage}
            />
            <h3>{interest.title}</h3>
            <p>{interest.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Interests;
