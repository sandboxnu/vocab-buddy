import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { User } from "../../models/types";
import { Dropdown, Menu } from "antd";
import rocketSVG from "../../assets/rocket.svg";
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

const StudentFilter = styled(Dropdown)`
  background: ${CLOUD};
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
    </StudentCardContainer>
  );
};

const menu = (
  <Menu>
    <Menu.Item key="0">alphabetical</Menu.Item>
    <Menu.Item key="1">age</Menu.Item>
    <Menu.Item key="3">current session</Menu.Item>
  </Menu>
);

interface ResearcherDashboardParams {
  students: User[];
}
const ResearcherDashboard: FunctionComponent<ResearcherDashboardParams> = ({
  students,
}) => {
  return (
    <ResearcherDashboardContainer>
      <ResearcherTopBar>
        <TitleText>students</TitleText>
        <Dropdown overlay={menu}>
          <p>sort by: </p>
        </Dropdown>
      </ResearcherTopBar>
      <AllStudentsContainer>
        {students.map((student) => (
          <StudentCard student={student} />
        ))}
      </AllStudentsContainer>
    </ResearcherDashboardContainer>
  );
};
export default ResearcherDashboard;
