import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { Assessment, AssessmentResult } from "../../models/types";
import {
  getAssessment as getAssessmentAction,
  updateAssessment,
  UpdateAssessmentAction,
} from "./data/actions";
import {
  getAssessment as getAssessmentReducer,
  getIsFinished,
} from "./data/reducer";
import QuizWords from "./QuizWords";

interface QuizProps {
  getAssessment: (id: string) => void;
  assessment: Assessment;
  updateAssessment: (action: UpdateAssessmentAction) => void;
  isFinished: boolean;
}

const connector = connect(
  (state) => ({
    assessment: getAssessmentReducer(state),
    isFinished: getIsFinished(state),
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
}: QuizProps) => {
  let history = useHistory();
  let params = useParams<QuizParams>();
  const [startTime] = useState(new Date());
  if (isFinished) {
    history.push("/dashboard");
  }
  useEffect(() => {
    if (!assessment) getAssessment(params.id);
  }, [assessment, getAssessment, params]);

  if (!assessment) {
    return <h1>Loading...</h1>;
  } else {
    const updateAssessmentWords = (
      responses: AssessmentResult[],
      isFinished: boolean,
      currentIdx: number,
      duration?: number
    ) => {
      updateAssessment({
        responses,
        id: params.id,
        isFinished,
        currentIdx,
        duration,
      });
    };
    return (
      <QuizWords
        assessment={assessment}
        startTime={startTime}
        updateWords={updateAssessmentWords}
      />
    );
  }
};

export default connector(Quiz);
