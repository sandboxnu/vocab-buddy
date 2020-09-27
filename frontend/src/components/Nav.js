import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { INK, CORAL, SEA_FOAM } from "../constants/colors";
import { MenuOutlined } from "@ant-design/icons";

const NavBar = styled.div`
  display: flex;
  height: 100px;
  justify-content: space-between;
  position: fixed;
  width: 100%;
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

const Link = styled.a`
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
  color: ${CORAL};
  display: flex;
  font-size: 20px;
  margin-right: 1.5em;

  :hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform: scale(1.5);
  }
`;

const OpenMenu = styled.div`
  background-color: ${INK};
  height: 50vh;
  margin-top: 40px;
  position: fixed;
  width: 100%;
`;

const OpenMenuContainer = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;

  a:not(:last-child) {
    margin-bottom: 2em;
  }
`;

const Nav = () => {
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

  const HeaderItems = () => {
    return (
      <>
        <Link href="/assessments">assessments</Link>
        <Link href="/interventions">interventions</Link>
        <Link href="/dashboard">dashboard</Link>
      </>
    );
  };

  return (
    <NavBar>
      <ProjectName>vocab buddy</ProjectName>
      {screenWidth <= 600 ? (
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
      )}
    </NavBar>
  );
};

export default Nav;
