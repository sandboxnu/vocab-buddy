import React from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import CloudGroup from "../../components/CloudGroup";
import Layout from "../../components/Layout";
import PurpleButton from "../../components/PurpleButton";

const TitleText = styled.p`
  font-family: "Rubik";
  font-size: 26px;
  font-weight: 700;
  text-transform: lowercase;
  word-wrap: break-word;
  padding: 20px;
`;

const WrappingDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function ErrorScreen() {
  let history = useHistory();
  return (
    <Layout>
      <>
        <CloudGroup />
        <WrappingDiv>
          <TitleText>oops, something went wrong</TitleText>
          <PurpleButton
            text="return to dashboard"
            onClick={() => history.push("/dashboard")}
          />
        </WrappingDiv>
      </>
    </Layout>
  );
}
