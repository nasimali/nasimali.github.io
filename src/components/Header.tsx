import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../css/Header.module.css";

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <div className={styles.logo}>
          <h1 className={styles.name}>Nasim Ali</h1>
          <h2 className={styles.role}>Software Engineer</h2>
        </div>
        <div className={`${styles.navLinks} ${showMenu ? styles.showNav : ""}`}>
          <Link to="/" onClick={() => setShowMenu(false)}>
            <i className={`fas fa-user ${styles.icon}`}></i>
            About
          </Link>
          <Link to="/experiences" onClick={() => setShowMenu(false)}>
            <i className={`fas fa-briefcase ${styles.icon}`}></i>
            Experiences
          </Link>
          <Link to="/education" onClick={() => setShowMenu(false)}>
            <i className={`fa-solid fa-school ${styles.icon}`}></i>
            Education
          </Link>
          <Link to="/interests" onClick={() => setShowMenu(false)}>
            <i className={`fas fa-star ${styles.icon}`}></i>
            Interests
          </Link>
          <a
            className={styles.socialLinks}
            href="https://github.com/nasimali"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fa-brands fa-square-github ${styles.icon}`}></i>
            GitHub
          </a>
          <a
            className={styles.socialLinks}
            href="https://linkedin.com/in/nasim-ali"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className={`fab fa-linkedin ${styles.icon}`}></i>
            LinkedIn
          </a>
        </div>
        <button className={styles.hamburger} onClick={handleMenuToggle}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>
    </header>
  );
};

export default Header;
