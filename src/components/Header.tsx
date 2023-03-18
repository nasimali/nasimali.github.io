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
            About
          </Link>
          <Link to="/experience" onClick={() => setShowMenu(false)}>
            Experience
          </Link>
          <Link to="/education" onClick={() => setShowMenu(false)}>
            Education
          </Link>
          <Link to="/interests" onClick={() => setShowMenu(false)}>
            Interests
          </Link>
          <a
            className={styles.socialLinks}
            href="https://github.com/nasimali"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            className={styles.socialLinks}
            href="https://linkedin.com/in/nasim-ali"
            target="_blank"
            rel="noopener noreferrer"
          >
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
