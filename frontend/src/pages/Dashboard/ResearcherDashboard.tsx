import React, { FunctionComponent, useState } from "react";
import styled from "styled-components";
import { User } from "../../models/types";
import { Dropdown, Menu } from "antd";
import rocketSVG from "../../assets/rocket.svg";
import caret from "../../assets/caret.svg";
import { CLOUD, SKY } from "../../constants/colors";

const ResearcherDashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 48px 40px 66px 40px;
`;

const AllStudentsContainer = styled.div`
  flex: 7;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: 900px) {
    min-width: 100%;
    padding-top: 48px;
    padding-right: 24px;
    padding-left: 24px;
  }
`;

const ResearcherTopBar = styled.div`
  flex: 7;
  display: flex;
  justify-content: space-between;
`;

const StudentCardContainer = styled.div`
  background: ${SKY};
  border-radius: 12px;
  padding: 32px 10px;
  text-align: center;
  flex: 0 1 calc(20% - 2em);
  margin: 24px 0;
  &:after {
    content: "";
    flex: auto;
  }
`;
//TODO REMOVE
const TitleText = styled.p`
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;

  @media (max-width: 900px) {
    font-size: 30px;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;
`;

const StudentCardLabel = styled.p`
  font-family: Rubik;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
  @media (max-width: 900px) {
    font-size: 16px;
    line-height: 25px;
  }
`;

const StudentFilter = styled(Dropdown)`
  background: ${CLOUD};
  padding: 10px;
  border-radius: 12px;
`;

const DropdownLabel = styled.p`
  font-size: 18px;
  line-height: 0px;
`;

const DropdownMenu = styled(Menu)`
  background: ${CLOUD};
  border-radius: 12px;
`;

interface StudentCardParams {
  student: User;
}

const StudentCard: FunctionComponent<StudentCardParams> = ({
  student,
}) => {
  return (
    <StudentCardContainer>
      <Avatar src={rocketSVG} />
      <StudentCardLabel>{student.name}</StudentCardLabel>
      <StudentCardLabel>Age: {student.age}</StudentCardLabel>
      <StudentCardLabel>
        SessionId: {student.sessionId}
      </StudentCardLabel>
    </StudentCardContainer>
  );
};

const sortByName = (studentA: User, studentB: User): number => {
  const aName = studentA.name.toLowerCase();
  const bName = studentB.name.toLowerCase();
  if (aName > bName) {
    return 1;
  } else if (bName > aName) {
    return -1;
  }
  return 0;
};

const sortByAge = (studentA: User, studentB: User): number => {
  return studentA.age - studentB.age;
};

const sortByProgress = (studentA: User, studentB: User): number => {
  if (
    studentA.sessionId === undefined ||
    studentA.sessionId < studentB.sessionId
  ) {
    return -1;
  } else if (
    studentA.sessionId > studentB.sessionId ||
    studentB.sessionId === undefined
  ) {
    return 1;
  } else return 0;
};

interface ResearcherDashboardParams {
  students: User[];
}

const ResearcherDashboard: FunctionComponent<ResearcherDashboardParams> = ({
  students,
}) => {
  const [sortBy, setSortBy] = useState(() => sortByName);
  const [sortLabel, setSortLabel] = useState("alphabetical");

  const menuOnClick = ({ key }: any) => {
    if (key === "alphabetical") {
      setSortBy(() => sortByName);
    }
    if (key === "age") {
      setSortBy(() => sortByAge);
    }
    if (key === "current session") {
      setSortBy(() => sortByProgress);
    }
    setSortLabel(key);
  };

  const menu = (
    <DropdownMenu onClick={menuOnClick}>
      <Menu.Item key="alphabetical">alphabetical</Menu.Item>
      <Menu.Item key="age">age</Menu.Item>
      <Menu.Item key="current session">current session</Menu.Item>
    </DropdownMenu>
  );

  return (
    <ResearcherDashboardContainer>
      <ResearcherTopBar>
        <TitleText>students</TitleText>
        <StudentFilter overlay={menu}>
          <DropdownLabel>
            sort by: <strong>{sortLabel}</strong>
            <img src={caret}></img>
          </DropdownLabel>
        </StudentFilter>
      </ResearcherTopBar>
      <AllStudentsContainer>
        {students.sort(sortBy).map((student) => (
          <StudentCard student={student} />
        ))}
      </AllStudentsContainer>
    </ResearcherDashboardContainer>
  );
};
export default ResearcherDashboard;
