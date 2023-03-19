import React from "react";
import styles from "../css/Footer.module.css";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>&copy; {currentYear} made by NMA</footer>
  );
};

export default Footer;
