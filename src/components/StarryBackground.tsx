import React from "react";
import styles from "../css/StarryBackground.module.css";

interface StarryBackgroundProps {
  backgroundImage: string;
}

const StarryBackground: React.FC<StarryBackgroundProps> = ({
  backgroundImage,
}) => {
  return (
    <div
      className={styles.starryBackground}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    ></div>
  );
};

export default StarryBackground;
