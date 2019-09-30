import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
import CodeIcon from "@material-ui/icons/Code";
import CastForEducationIcon from "@material-ui/icons/CastForEducation";
import Favorite from "@material-ui/icons/Favorite";
// core components
import Header from "components/Header/Header.js";
import Footer from "components/Footer/Footer.js";
import Button from "components/CustomButtons/Button.js";
import GridContainer from "components/Grid/GridContainer.js";
import GridItem from "components/Grid/GridItem.js";
import HeaderLinks from "components/Header/HeaderLinks.js";
import NavPills from "components/NavPills/NavPills.js";
import Parallax from "components/Parallax/Parallax.js";

import profile from "assets/img/faces/nasim.jpg";

import edu1 from "assets/img/education/earlsmead-logo.png";
import edu2 from "assets/img/education/gladesmore-logo.jpeg";
import edu3 from "assets/img/education/kcl-logo.png";

import work1 from "assets/img/experiences/java.png";
import work2 from "assets/img/experiences/mysql.jpg";
import work3 from "assets/img/experiences/react.png";
import work4 from "assets/img/experiences/redux.svg";
import work5 from "assets/img/experiences/springlogo.png";

import int1 from "assets/img/interests/cloud.jpg";
import int2 from "assets/img/interests/crypto.png";
import int3 from "assets/img/interests/js.jpg";
import int4 from "assets/img/interests/www.png";

import styles from "assets/jss/material-kit-react/views/profilePage.js";
import { Tooltip } from "@material-ui/core";

const useStyles = makeStyles(styles);

export default function ProfilePage(props) {
  const classes = useStyles();
  const { ...rest } = props;
  const imageClasses = classNames(
    classes.imgRaised,
    classes.imgRoundedCircle,
    classes.imgFluid
  );
  const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
  return (
    <div>
      <Header
        color="transparent"
        brand="NMA"
        rightLinks={<HeaderLinks />}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "white"
        }}
        {...rest}
      />
      <Parallax small filter image={require("assets/img/profile-bg.jpg")} />
      <div className={classNames(classes.main, classes.mainRaised)}>
        <div>
          <div className={classes.container}>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={6}>
                <div className={classes.profile}>
                  <div>
                    <img src={profile} alt="..." className={imageClasses} />
                  </div>
                  <div className={classes.name}>
                    <h3 className={classes.title}>Nasim Mohammed Ali</h3>
                    <h6>SOFTWARE DEVELOPER</h6>
                    <Button
                      justIcon
                      link
                      href="https://github.com/nasimali"
                      target="_blank"
                      className={classes.margin5}
                    >
                      <i className={"fab fa-github"} />
                    </Button>
                    <Button
                      justIcon
                      link
                      href="https://www.linkedin.com/in/nasim-ali/"
                      target="_blank"
                      className={classes.margin5}
                    >
                      <i className={"fab fa-linkedin"} />
                    </Button>
                    <Button
                      justIcon
                      link
                      href="https://www.instagram.com/nasimali217/"
                      target="_blank"
                      className={classes.margin5}
                    >
                      <i className={"fab fa-instagram"} />
                    </Button>
                    <Button
                      justIcon
                      link
                      href="https://twitter.com/Nasimmali"
                      target="_blank"
                      className={classes.margin5}
                    >
                      <i className={"fab fa-twitter"} />
                    </Button>
                  </div>
                </div>
              </GridItem>
            </GridContainer>
            <div className={classes.description}>
              <p>
                I am a hard working dedicated person, who started university at
                the age of 16 to study Computer Science. Who desires to work in
                the field of software engineering. My goals are to expand my
                knowledge in software development and cybersecurity.{" "}
              </p>
            </div>
            <GridContainer justify="center">
              <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                <NavPills
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Education",
                      tabIcon: CastForEducationIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <Tooltip title="Earlsmead Primary School">
                              <img
                                alt="Earlsmead Primary School"
                                src={edu1}
                                className={navImageClasses}
                              />
                            </Tooltip>
                            <Tooltip title="Gladesmore Community School">
                              <img
                                alt="Gladesmore Community School"
                                src={edu2}
                                className={navImageClasses}
                              />
                            </Tooltip>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={8}>
                            <Tooltip title="King's College London">
                              <img
                                alt="King's College London"
                                src={edu3}
                                className={navImageClasses}
                              />
                            </Tooltip>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Experience",
                      tabIcon: CodeIcon,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <Tooltip title="Java">
                              <img
                                alt="Java"
                                src={work1}
                                className={navImageClasses}
                              />
                            </Tooltip>
                            <Tooltip title="MySql">
                              <img
                                alt="MySQL"
                                src={work2}
                                className={navImageClasses}
                              />
                            </Tooltip>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <Tooltip title="React JS">
                              <img
                                alt="React JS"
                                src={work3}
                                className={navImageClasses}
                              />
                            </Tooltip>
                            <Tooltip title="Redux">
                              <img
                                alt="Redux"
                                src={work4}
                                className={navImageClasses}
                              />
                            </Tooltip>
                            <Tooltip title="Spring Boot">
                              <img
                                alt="Spring Boot"
                                src={work5}
                                className={navImageClasses}
                              />
                            </Tooltip>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Interests",
                      tabIcon: Favorite,
                      tabContent: (
                        <GridContainer justify="center">
                          <GridItem xs={12} sm={12} md={4}>
                            <Tooltip title="Cloud Computing">
                              <img
                                alt="Cloud Computing"
                                src={int1}
                                className={navImageClasses}
                              />
                            </Tooltip>
                            <Tooltip title="JavaScript Frameworks">
                              <img
                                alt="JavaScript Frameworks"
                                src={int3}
                                className={navImageClasses}
                              />
                            </Tooltip>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={4}>
                            <Tooltip title="Crypocurrencies">
                              <img
                                alt="Cryptocurrency"
                                src={int2}
                                className={navImageClasses}
                              />
                            </Tooltip>
                            <Tooltip title="World Wide Web">
                              <img
                                alt="World Wide Web"
                                src={int4}
                                className={navImageClasses}
                              />
                            </Tooltip>
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
              </GridItem>
            </GridContainer>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
