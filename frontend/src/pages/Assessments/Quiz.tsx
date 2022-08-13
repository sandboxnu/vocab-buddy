import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Assessment, AssessmentResult } from '../../models/types';
import LoadingScreen from '../Loading/LoadingScreen';
import {
  getAssessment as getAssessmentAction,
  updateAssessment,
  UpdateAssessmentAction,
} from './data/actions';
import {
  getAssessment as getAssessmentReducer,
  getError,
  getIsFinished,
} from './data/reducer';
import QuizWords from './QuizWords';

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
  },
);

interface QuizParams {
  id: string;
}

function Quiz({
  getAssessment,
  assessment,
  updateAssessment,
  isFinished,
  error,
}: QuizProps) {
  const history = useNavigate();
  const params = useParams<QuizParams>();
  if (isFinished) {
    navigate('/assessments/reward');
  }

  if (error) {
    navigate('/error');
  }

  useEffect(() => {
    if (!assessment) getAssessment(params.id);
  }, [assessment, getAssessment, params]);

  if (!assessment) {
    return <LoadingScreen />;
  }
  const updateAssessmentWords = (
    responses: AssessmentResult[],
    isFinished: boolean,
    currentIdx: number,
    durationInSeconds: number,
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

export default connector(Quiz);
