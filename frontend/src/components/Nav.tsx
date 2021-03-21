import { MenuOutlined } from "@ant-design/icons";
import React, {
  FunctionComponent,
  ReactElement,
  useEffect,
  useState,
} from "react";
import { Link, useLocation } from "react-router-dom";
import styled from "styled-components";
import { INK, SEA_FOAM } from "../constants/colors";

interface NavProps {
  showsBar: boolean;
}

const NavBar = styled.div`
  background: white;
  display: flex;
  height: 80px;
  justify-content: ${({ showsBar }: NavProps) =>
    showsBar ? "space-between" : "center"};
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

interface LinkAttributes {
  isCurrent: boolean;
}

const StyledLink = styled(Link)`
  color: #000;
  font-family: "Rubik", sans-serif;
  font-size: 20px;
  font-weight: 700;
  text-decoration: none;
  text-transform: lowercase;
  border-bottom: ${({ isCurrent }: LinkAttributes) =>
    isCurrent ? "4px solid " + SEA_FOAM : "0px"};

  :hover {
    color: #000;
    border-bottom: 4px solid ${SEA_FOAM};
  }
`;

const StyledMenuIcon = styled(MenuOutlined)`
  align-items: center;
  display: flex;
  position: fixed;
  font-size: 25px;
  margin-left: 1.5em;
  left: 0;
  height: 80px;
  top: 0px;

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
  left: 0;
`;

const OpenMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  padding: 12px 50px;

  a:not(:last-child) {
    margin-bottom: 2em;
  }
`;

const Nav: FunctionComponent<NavProps> = ({
  showsBar,
}): ReactElement => {
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

  let location = useLocation();

  const HeaderItems = (): ReactElement => {
    return (
      <StyledLink
        to="/dashboard"
        isCurrent={location.pathname.includes("dashboard")}
      >
        dashboard
      </StyledLink>
    );
  };

  return (
    <NavBar
      showsBar={(showsBar && screenWidth > 600) || screenWidth > 900}
    >
      <ProjectName>vocab buddy</ProjectName>
      {showsBar &&
        (screenWidth <= 600 ? (
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
