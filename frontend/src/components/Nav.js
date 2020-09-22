import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { LIGHT_PURPLE, PURPLE } from "../constants/colors";
import { MenuOutlined } from "@ant-design/icons";

const NavBar = styled.div`
  background-color: ${LIGHT_PURPLE};
  display: flex;
  height: 50px;
  justify-content: space-between;
  position: fixed;
  width: 100%;
`;

const NavContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  margin-right: 2em;

  a:not(:last-child) {
    margin-right: 1.5em;
  }
`;

const ProjectName = styled.div`
  align-items: center;
  display: flex;
  color: ${PURPLE};
  font-weight: 600;
  margin-left: 2em;
  text-transform: uppercase;
`;

const Link = styled.a`
  color: ${PURPLE};
  text-decoration: none;
  font-weight: 600;
`;

const StyledMenuIcon = styled(MenuOutlined)`
  align-items: center;
  color: ${PURPLE};
  display: flex;
  font-size: 20px;
  margin-right: 1.5em;

  :hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    transform: scale(1.5);
  }
`;

const Nav = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  useEffect(() => {
    const resizeScreen = () => {
      setScreenWidth(window.innerWidth);
    };
    window.addEventListener("resize", resizeScreen);
    return () => {
      window.removeEventListener("resize", resizeScreen);
    };
  }, []);

  return (
    <NavBar>
      <ProjectName>Vocab Buddy</ProjectName>
      {screenWidth <= 600 ? (
        <StyledMenuIcon />
      ) : (
        <NavContainer>
          <Link>Accessments</Link>
          <Link>Interventions</Link>
          <Link>Dashboard</Link>
        </NavContainer>
      )}
    </NavBar>
  );
};

export default Nav;
