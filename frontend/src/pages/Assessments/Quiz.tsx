import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Assessment, AssessmentResult } from "../../models/types";
import { getAssessment as getAssessmentAction, updateAssessment } from "./data/actions";
import { getAssessment as getAssessmentReducer, getIsFinished } from "./data/reducer";
import QuizWords from "./QuizWords";

interface QuizProps {
  getAssessment: (id: string) => void;
  assessment: Assessment;
  updateAssessment: (responses: AssessmentResult[], id: string, isFinished: boolean, currentIdx: number) => void;
  isFinished: boolean
}

const connector = connect(
  (state) => ({
    assessment: getAssessmentReducer(state),
    isFinished: getIsFinished(state)
  }),
  {
    getAssessment: getAssessmentAction.request,
    updateAssessment: (responses: AssessmentResult[], id: string, isFinished: boolean, currentIdx: number ) => updateAssessment.request({ responses, id, isFinished, currentIdx })
  }
);

interface QuizParams {
  id: string;
}

const Quiz = ({ getAssessment, assessment, updateAssessment, isFinished }: QuizProps) => {
  let history = useHistory();
  let params = useParams<QuizParams>();
  if (isFinished) {
    history.push("/dashboard");
  }
  useEffect(() => {
    if (!assessment) getAssessment(params.id);
  }, [assessment, getAssessment, params]);

  if (!assessment) {
    return <h1>Loading...</h1>;
  } else {
    const updateAssessmentWords = (responses: AssessmentResult[], isFinished: boolean, currentIdx: number) => {
      updateAssessment(responses, params.id, isFinished, currentIdx);
    }
    return <QuizWords assessment={assessment} updateWords={updateAssessmentWords} />;
  }
};

export default connector(Quiz);
