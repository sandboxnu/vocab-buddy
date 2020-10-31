import React from "react";
import { connect } from "react-redux";
import { getAssessment as getAssessmentAction } from "./data/actions";
import { getAssessment as getAssessmentReducer } from "./data/reducer";
import { Assessment } from "../../models/types";
import QuizWords from "./QuizWords";

interface QuizProps {
  getAssessment: () => void;
  assessment: Assessment;
}

const connector = connect(
  (state) => ({
    assessment: getAssessmentReducer(state),
  }),
  {
    getAssessment: getAssessmentAction.request,
  }
);

const Quiz = ({ getAssessment, assessment }: QuizProps) => {
  if (!assessment) {
    getAssessment();
    return <h1>Loading...</h1>;
  } else {
    return <QuizWords assessment={assessment} />;
  }
};

export default connector(Quiz);
