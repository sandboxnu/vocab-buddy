import React, {
  FunctionComponent,
  useCallback,
  useState,
} from "react";
import styled from "styled-components";
import { User } from "../../models/types";
import { Alert, Dropdown, Menu } from "antd";
import caret from "../../assets/caret.svg";
import { CLOUD, SKY } from "../../constants/colors";
import { useHistory } from "react-router";
import { DownloadOutlined } from "@ant-design/icons";

const ResearcherDashboardContainer = styled.div`
  display: flex;
  flex: 7;
  flex-direction: column;
  padding: 48px 40px 66px 40px;
`;

const AllStudentsContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  column-gap: 48px;
  row-gap: 48px;

  @media (max-width: 1300px) {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }

  @media (max-width: 1100px) {
    grid-template-columns: 1fr 1fr 1fr;
  }

  @media (max-width: 900px) {
    min-width: 100%;
    grid-template-columns: 1fr 1fr;
    column-gap: 24px;
    row-gap: 24px;
  }
`;

const ResearcherTopBar = styled.div`
  flex: 7;
  display: flex;
  justify-content: space-between;
  margin-bottom: 24px;

  @media (max-width: 375px) {
    flex-wrap: wrap;
  }
`;

const StudentCardContainer = styled.div`
  background: ${SKY};
  border-radius: 12px;
  padding: 32px 10px;
  text-align: center;

  :hover {
    cursor: pointer;
    opacity: 0.8;
  }
`;

const TitleText = styled.p`
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
  text-transform: lowercase;

  @media (max-width: 900px) {
    font-size: 22px;
  }
`;

const Avatar = styled.img`
  border-radius: 50%;

  @media (max-width: 900px) {
    width: 62px;
    height: 62px;
  }
`;

const StudentCardLabel = styled.p`
  font-family: Rubik;
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0px;
  text-align: center;
  margin-top: 16px;
  @media (max-width: 900px) {
    font-size: 16px;
    line-height: 25px;
    margin-top: 10px;
  }
`;

const StudentFilter = styled(Dropdown)`
  background: ${CLOUD};
  padding: 10px;
  border-radius: 12px;
`;

const DropdownLabel = styled.div`
  font-size: 18px;
  font-weight: 700;
  height: 50px;
  width: 260px;
  display: flex;
  padding: 10px 24px;
  justify-content: space-between;
  align-items: baseline;
  cursor: pointer;

  @media (max-width: 900px) {
    font-size: 16px;
    width: 220px;
    padding: 10px 18px;
  }
`;

const DropdownCaret = styled.img`
  margin: 5px 0px 5px 5px;
  padding-bottom: 2px;
  width: 15px;
  height: 10px;

  @media (max-width: 900px) {
    width: 12px;
    height: 6px;
  }
`;

const DropdownMenu = styled(Menu)`
  background: ${CLOUD};
  border-radius: 12px;
  li {
    font-size: 18px;
    :last-child {
      border-bottom-right-radius: 12px;
      border-bottom-left-radius: 12px;
    }

    :first-child {
      border-top-right-radius: 12px;
      border-top-left-radius: 12px;
    }
  }

  @media (max-width: 900px) {
    li {
      font-size: 16px;
    }
  }
`;

const StyledAlert = styled(Alert)`
  position: absolute;
  top: 10px;
  background-color: ${CLOUD};

  @media (max-width: 900px) {
    width: 100%;
  }

  @media (min-width: 901px) {
    width: 50%;
    left: 25%;
  }
  margin: auto;
  z-index: 1000;
`;

interface StudentCardParams {
  student: User;
}

const StudentCard: FunctionComponent<StudentCardParams> = ({
  student,
}) => {
  const history = useHistory();
  return (
    <StudentCardContainer
      onClick={() => history.push(`/dashboard/student/${student.id}`)}
    >
      <Avatar
        src={
          student.profileIcon ??
          "https://firebasestorage.googleapis.com/v0/b/vocab-buddy-53eca.appspot.com/o/icons%2Frocketcircle.svg?alt=media&token=2378a891-001b-4a7f-9522-3dffee8d202d"
        }
      />
      <StudentCardLabel>{student.name}</StudentCardLabel>
    </StudentCardContainer>
  );
};

const sortBy = (
  key: string,
  studentA: User,
  studentB: User
): number => {
  if (key === "age") {
    return sortByAge(studentA, studentB);
  } else if (key === "session") {
    return sortBySession(studentA, studentB);
  } else {
    return sortByName(studentA, studentB);
  }
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
  return studentA.dob.getTime() - studentB.dob.getTime();
};

const sortBySession = (studentA: User, studentB: User): number => {
  if (studentA.sessionId < studentB.sessionId) {
    return -1;
  } else if (studentA.sessionId > studentB.sessionId) {
    return 1;
  } else return 0;
};

interface ResearcherDashboardParams {
  students: User[];
  downloadAllData?: () => void;
  downloadAllDataLoading: boolean;
}

const ResearcherDashboard: FunctionComponent<ResearcherDashboardParams> = ({
  students,
  downloadAllData,
  downloadAllDataLoading,
}) => {
  const [sortByLabel, setSortByLabel] = useState(
    () => "alphabetical"
  );

  const menuOnClick = ({ key }: any) => {
    setSortByLabel(key);
  };

  const downloadAllStudentData = useCallback(() => {
    if (downloadAllData) {
      downloadAllData();
    }
  }, [downloadAllData]);

  const menu = (
    <DropdownMenu onClick={menuOnClick}>
      <Menu.Item key="alphabetical">alphabetical</Menu.Item>
      <Menu.Item key="age">age</Menu.Item>
      <Menu.Item key="session">session</Menu.Item>
    </DropdownMenu>
  );

  return (
    <ResearcherDashboardContainer>
      <ResearcherTopBar>
        <TitleText>
          students{" "}
          <DownloadOutlined onClick={downloadAllStudentData} />
          {downloadAllDataLoading && (
            <StyledAlert
              type="info"
              message={`Downloading data... Please be patient`}
              banner
            />
          )}
        </TitleText>
        <StudentFilter trigger={["click"]} overlay={menu}>
          <DropdownLabel>
            <p>sort by: {sortByLabel}</p>
            <DropdownCaret src={caret}></DropdownCaret>
          </DropdownLabel>
        </StudentFilter>
      </ResearcherTopBar>
      <AllStudentsContainer>
        {students
          .sort((a, b) => sortBy(sortByLabel, a, b))
          .map((student, index) => (
            <StudentCard
              key={student.name + index}
              student={student}
            />
          ))}
      </AllStudentsContainer>
    </ResearcherDashboardContainer>
  );
};
export default ResearcherDashboard;
