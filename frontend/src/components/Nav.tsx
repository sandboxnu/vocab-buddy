import { MenuOutlined } from "@ant-design/icons";
import firebase from "firebase";
import React, { FunctionComponent, ReactElement, useEffect, useState } from "react";
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { INK, SEA_FOAM } from "../constants/colors";

interface NavProps {
  showsBar: boolean
}

const NavBar = styled.div`
  background: clear;
  display: flex;
  height: 80px;
  justify-content: space-between;
  position: fixed;
  width: 100%;
  z-index: 5;
`;

const NavContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  margin: 0 2em;

  a:not(:last-child) {
    margin-right: 1.5em;
  }
`;

const ProjectName = styled.div`
  align-items: center;
  display: flex;
  color: ${INK};
  font-family: "Rubik", sans-serif;
  font-size: 25px;
  font-weight: 700;
  margin-left: 2em;
  text-transform: lowercase;
`;

const StyledLink = styled(Link)`
  color: #000;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  text-transform: lowercase;

  :hover {
    color: #000;
    border-bottom: 4px solid ${SEA_FOAM};
  }
`;

const StyledMenuIcon = styled(MenuOutlined)`
  align-items: center;
  display: flex;
  font-size: 25px;
  margin-right: 1.5em;

  :hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform: scale(1.2);
  }
`;

const OpenMenu = styled.div`
  background: #fff;
  margin-top: 80px;
  position: fixed;
  right: 0;
`;

const OpenMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 20px 50px;

  a:not(:last-child) {
    margin-bottom: 2em;
  }
`;

const Nav : FunctionComponent<NavProps> = ( { showsBar }) : ReactElement => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [isOpen, setIsOpen] = useState(false);
  useEffect(() => {
    const resizeScreen = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  const HeaderItems = () : ReactElement => {
    return (
      <>
        <StyledLink to="/assessments">assessments</StyledLink>
        <StyledLink to="/interventions" onClick={() => firebase.auth().signOut()}>
          interventions
        </StyledLink>
        <StyledLink to="/dashboard">dashboard</StyledLink>
      </>
    );
  };

  return (
    <NavBar style={showsBar || screenWidth > 900 ? {} : {justifyContent: 'center'}}>
      <ProjectName>vocab buddy</ProjectName>
      {showsBar && (screenWidth <= 600 ? (
        <>
          <StyledMenuIcon onClick={() => setIsOpen(!isOpen)} />
          {isOpen && (
            <OpenMenu>
              <OpenMenuContainer>{HeaderItems()}</OpenMenuContainer>
            </OpenMenu>
          )}
        </>
      ) : (
        <NavContainer>{HeaderItems()}</NavContainer>
      ))}
    </NavBar>
  );
};

export default Nav;
