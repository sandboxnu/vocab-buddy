import React, { useEffect } from 'react';
import { connect, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { AssessmentResult } from '../../models/types';
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

type QuizParams = {
  id: string;
};

function Quiz() {
  const assessment = useSelector(getAssessmentReducer);
  const isFinished = useSelector(getIsFinished);
  const error = useSelector(getError);
  const getAssessment = getAssessmentAction.request;
  const navigate = useNavigate();
  const params = useParams<QuizParams>();
  if (isFinished) {
    navigate('/assessments/reward');
  }

  if (error) {
    navigate('/error');
  }

  useEffect(() => {
    if (!assessment) getAssessment(params.id || 'err');
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
    updateAssessment.request({
      responses,
      id: params.id || 'err',
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

export default Quiz;
