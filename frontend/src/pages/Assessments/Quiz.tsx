import React, { useEffect } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Assessment, AssessmentResult } from "../../models/types";
import LoadingScreen from "../Loading/LoadingScreen";
import {
  getAssessment as getAssessmentAction,
  updateAssessment,
  UpdateAssessmentAction,
} from "./data/actions";
import {
  getAssessment as getAssessmentReducer,
  getError,
  getIsFinished,
} from "./data/reducer";
import QuizWords from "./QuizWords";

interface QuizProps {
  getAssessment: (id: string) => void;
  assessment: Assessment;
  updateAssessment: (action: UpdateAssessmentAction) => void;
  isFinished: boolean;
  error?: Error;
}

const connector = connect(
  (state) => ({
    assessment: getAssessmentReducer(state),
    isFinished: getIsFinished(state),
    error: getError(state),
  }),
  {
    getAssessment: getAssessmentAction.request,
    updateAssessment: updateAssessment.request,
  }
);

interface QuizParams {
  id: string;
}

const Quiz = ({
  getAssessment,
  assessment,
  updateAssessment,
  isFinished,
  error,
}: QuizProps) => {
  let history = useHistory();
  let params = useParams<QuizParams>();
  if (isFinished) {
    history.push("/assessments/reward");
  }

  if (error) {
    history.push("/error");
  }

  useEffect(() => {
    if (!assessment) getAssessment(params.id);
  }, [assessment, getAssessment, params]);

  if (!assessment) {
    return <LoadingScreen />;
  } else {
    const updateAssessmentWords = (
      responses: AssessmentResult[],
      isFinished: boolean,
      currentIdx: number,
      durationInSeconds: number
    ) => {
      updateAssessment({
        responses,
        id: params.id,
        sessionId: assessment.sessionId,
        isFinished,
        currentIdx,
        durationInSeconds,
      });
    };
    return (
      <QuizWords
        assessment={assessment}
        updateWords={updateAssessmentWords}
      />
    );
  }
};

export default connector(Quiz);
