import React from "react";
import Layout from "../../components/Layout";
import Quiz from "./Quiz";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 0 10em;
`;

const Assessments = () => {
  return (
    <Layout>
      <Wrapper>
        <Quiz />
      </Wrapper>
    </Layout>
  );
};

export default Assessments;
