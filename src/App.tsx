// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Education from "./components/Education";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Interests from "./components/Interests";
import StarryBackground from "./components/StarryBackground";
import Timeline from "./components/Timeline";
import styles from "./css/App.module.css";
import "./css/index.css";
import starryBackgroundImage from "./images/starry-background-image.jpg";

const App: React.FC = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Header />
        <StarryBackground backgroundImage={starryBackgroundImage} />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/experience" element={<Timeline />} />
          <Route path="/education" element={<Education />} />
          <Route path="/interests" element={<Interests />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
