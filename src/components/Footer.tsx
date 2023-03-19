import React from "react";
import styles from "../css/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      &copy; {currentYear} made with{" "}
      <span>
        {" "}
        <i className={`fa-solid fa-heart ${styles.icon}`}></i>
      </span>{" "}
      by NMA
    </footer>
  );
};

export default Footer;
