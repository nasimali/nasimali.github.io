// src/App.tsx
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import About from "./components/About";
import Education from "./components/Education";
import Header from "./components/Header";
import Interests from "./components/Interests";
import Timeline from "./components/Timeline";
import "./css/index.css";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<About />} />
          <Route path="/experience" element={<Timeline />} />
          <Route path="/education" element={<Education />} />
          <Route path="/interests" element={<Interests />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
