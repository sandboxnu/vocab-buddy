import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { INK, COLAL } from "../constants/colors";
import { MenuOutlined } from "@ant-design/icons";

const NavBar = styled.div`
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
  color: ${INK};
  font-weight: 600;
  margin-left: 2em;
  text-transform: uppercase;
`;

const Link = styled.a`
  color: #000;
  text-decoration: none;
  font-weight: 600;
  ${(props) =>
    props.size &&
    `
    font-size: ${props.size}px;
  `}
`;

const StyledMenuIcon = styled(MenuOutlined)`
  align-items: center;
  color: ${COLAL};
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

  const HeaderItems = (s) => {
    return (
      <>
        <Link size={s} href="/">
          Testing
        </Link>
        <Link size={s} href="/assessments">
          Assessments
        </Link>
        <Link size={s} href="/interventions">
          Interventions
        </Link>
        <Link size={s} href="/dashboard">
          Dashboard
        </Link>
      </>
    );
  };

  return (
    <NavBar>
      <ProjectName>Vocab Buddy</ProjectName>
      {screenWidth <= 600 ? (
        <>
          <StyledMenuIcon onClick={() => setIsOpen(!isOpen)} />
          {isOpen && (
            <OpenMenu>
              <OpenMenuContainer>{HeaderItems(20)}</OpenMenuContainer>
            </OpenMenu>
          )}
        </>
      ) : (
        <NavContainer>{HeaderItems(15)}</NavContainer>
      )}
    </NavBar>
  );
};

export default Nav;
