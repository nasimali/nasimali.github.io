import React from "react";
import styles from "../css/Interests.module.css";
import animePlaceholder from "../images/anime.jpg";
import codingPlaceholder from "../images/coding_placeholder.jpg";
import kickboxingPlaceholder from "../images/kickboxing_gloves_placeholder.jpg";
import technologyPlaceholder from "../images/technology_placeholder.jpg";

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
    // Add more cases if necessary
    default:
      return ""; // return an empty string or a default image
  }
};

const interestsData = [
  {
    id: 1,
    title: "Technology",
    description:
      "I'm captivated by technology's potential to shape our lives and solve complex problems. Its dynamic nature keeps me engaged, inspired, and eager to contribute. Besides, who doesn't love a good tech joke? Why did the computer go to art school? To learn how to draw a better 'byte'!",
    imageUrl: "technology",
  },
  {
    id: 2,
    title: "Coding",
    description:
      "I'm passionate about coding because it allows me to create innovative solutions and bring ideas to life. The challenge of solving complex problems keeps me engaged, while the satisfaction of seeing my code turn into functional applications drives my enthusiasm. As a coder, I enjoy the satisfaction to make a tangible impact on the world through technology.",
    imageUrl: "coding",
  },
  {
    id: 3,
    title: "Kickboxing",
    description:
      "I'm drawn to kickboxing for the exhilarating challenge it presents and the numerous health benefits it offers. The sport combines physical intensity with mental discipline, pushing me to constantly improve my skills and overcome obstacles. Engaging in kickboxing not only strengthens my body, but also sharpens my mind, fostering resilience and determination that carry over into other aspects of my life.",
    imageUrl: "kickboxing",
  },
  {
    id: 4,
    title: "Anime/Manga",
    description:
      "I've been a lifelong fan of anime and manga, captivated by their unique and engaging storylines that set them apart from conventional cartoons. The imaginative worlds and compelling narratives they offer have accompanied me since childhood, fueling my creativity and broadening my perspectives. As an ardent enthusiast, I continue to appreciate the depth and artistry of anime and manga, finding inspiration and joy in their ever-evolving landscapes.",
    imageUrl: "anime",
  },
];

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
