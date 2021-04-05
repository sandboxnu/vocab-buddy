/**
 * Represents an assessment
 */
export interface Assessment {
  id: number;
  sessionId: SessionId;
  words: Word[];
  currentIndex: number;
  firebaseId: string;
}

/**
 * Represents a word used in an assessment.
 */
export interface Word {
  value: string;
  correctImage: string;
  incorrectImages: string[];
  id: string;
  createdAt: Date;
}

/**
 * Represents a list of interventions for multiple words.
 */
export interface Interventions {
  setId: string;
  sessionId: SessionId;
  wordList: InterventionWord[]; // list of Intervention words
  wordIdx: number; // current word you're on
  activityIdx: number; // current activity you're on
}

/**
 * Represents an intervention for a word, with four different activities.
 */
export interface InterventionWord {
  word: Word;
  activities: ActivityList;
}

export interface ActivityList {
  a1: Definition;
  a2: Example;
  a3: Context;
  a3Part2: Context;
  a3Part3: Context;
  a4: Review;
}

/**
 * Activity 1 consists of oral prompts and an image.
 */
export interface Definition {
  prompt: string;
  url: string;
}

/**
 * Activity 2 consists of 2 images, and an oral prompt.
 */
export interface Example {
  prompt: string;
  correctUrl: string;
  incorrectUrl: string;
}

/**
 * Activity 3 consists of an image, a prompt, and a correct answer.
 */
export interface Context {
  prompt: string;
  url: string;
  correctAnswer: boolean;
}

/**
 * Activity 4 consists of an image and oral prompt.
 */
export interface Review {
  prompt: string;
  url: string;
}

/**
 * Represents a User object
 */
export interface User {
  id: string;
  name: string;
  accountType: AccountType;
  age: number;
  sessionId: SessionId;
  onAssessment: boolean;
  currentInterventionOrAssessment: string;
  daysActive: string[];
  profileIcon: string;
}

/**
 * Represents account types
 */
export type AccountType = "RESEARCHER" | "STUDENT";

// also these & all State/Action can def be moved to a separate file
/**
 * Represents types for redux Actions.
 */
export enum ActionTypes {
  REQUEST = "REQUEST",
  SUCCESS = "SUCCESS",
  ERROR = "ERROR",
  CREATE_USER_ERROR = "CREATE_USER_ERROR",
  CREATE_USER = "CREATEUSER",
  SIGN_IN = "SIGNIN",
  AUTHENTICATION_SUCCESS = "AUTHENTICATIONSUCCESS",
  GET_WORDS = "GETWORDS",
  GET_ASSESSMENT_SUCCESS = "GET_ASSESSMENT_SUCCESS",
  GET_ASSESSMENT_REQUEST = "GET_ASSESSMENT_REQUEST",
  GET_ASSESSMENT_ERROR = "GET_ASSESSMENT_ERROR",
  GET_CURRENT_ASSESSMENT_REQUEST = "GET_CURRENT_ASSESSMENT_REQUEST",
  GET_CURRENT_ASSESSMENT_SUCCESS = "GET_CURRENT_ASSESSMENT_SUCCESS",
  GET_CURRENT_ASSESSMENT_ERROR = "GET_CURRENT_ASSESSMENT_ERROR",
  RESET_PASSWORD = "RESETPASSWORD",
  RESET_PASSWORD_SUCCESS = "RESETPASSWORDSUCCESS",
  GET_INTERVENTIONS_REQUEST = "GET_INTERVENTIONS_REQUEST",
  GET_INTERVENTIONS_ERROR = "GET_INTERVENTIONS_ERROR",
  GET_INTERVENTIONS_SUCCESS = "GET_INTERVENTIONS_SUCCESS",
  GET_CURRENT_INTERVENTIONS_REQUEST = "GET_CURRENT_INTERVENTIONS_REQUEST",
  GET_CURRENT_INTERVENTIONS_SUCCESS = "GET_CURRENT_INTERVENTIONS_SUCCESS",
  GET_CURRENT_INTERVENTIONS_ERROR = "GET_CURRENT_INTERVENTIONS_ERROR",
  SIGN_OUT_REQUEST = "SIGN_OUT_REQUEST",
  SIGN_OUT_SUCCESS = "SIGN_OUT_SUCCESS",
  SIGN_OUT_ERROR = "SIGN_OUT_ERROR",
  UPDATE_INTERVENTION_REQUEST = "UPDATE_INTERVENTION_REQUEST",
  UPDATE_INTERVENTION_ERROR = "UPDATE_INTERVENTION_ERROR",
  UPDATE_INTERVENTION_SUCCESS = "UPDATE_INTERVENTION_SUCCESS",
  UPDATE_ASSESSMENT_REQUEST = "UPDATE_ASSESSMENT_REQUEST",
  UPDATE_ASSESSMENT_SUCCESS = "UPDATE_ASSESSMENT_SUCCESS",
  UPDATE_ASSESSMENT_ERROR = "UPDATE_ASSESSMENT_ERROR",
  FINISHED_INTERVENTION_REQUEST = "FINISHED_INTERVENTION_REQUEST",
  FINISHED_INTERVENTION_SUCCESS = "FINISHED_INTERVENTION_SUCCESS",
  FINISHED_INTERVENTION_ERROR = "FINISHED_INTERVENTION_ERROR",
  GET_DASHBOARD_DATA_REQUEST = "GET_DASHBOARD_DATA_REQUEST",
  GET_DASHBOARD_DATA_SUCCESS = "GET_DASHBOARD_DATA_SUCCESS",
  GET_DASHBOARD_DATA_ERROR = "GET_DASHBOARD_DATA_ERROR",
  GET_DATA_FOR_RESEARCHERS_REQUEST = "GET_DATA_FOR_RESEARCHERS_REQUEST",
  GET_DATA_FOR_RESEARCHERS_SUCCESS = "GET_DATA_FOR_RESEARCHERS_SUCCESS",
  GET_DATA_FOR_RESEARCHERS_ERROR = "GET_DATA_FOR_RESEARCHERS_ERROR",
  GET_USER_SESSION_DATA_REQUEST = "GET_USER_SESSION_DATA_REQUEST",
  GET_USER_SESSION_DATA_SUCCESS = "GET_USER_SESSION_DATA_SUCCESS",
  GET_USER_SESSION_DATA_ERROR = "GET_USER_SESSION_DATA_ERROR",
  CHANGE_PROFILE_ICON_REQUEST = "CHANGE_PROFILE_ICON_REQUEST",
  CHANGE_PROFILE_ICON_SUCCESS = "CHANGE_PROFILE_ICON_SUCCESS",
  CHANGE_PROFILE_ICON_ERROR = "CHANGE_PROFILE_ICON_ERROR",
  GET_REQUESTED_STUDENT_DASHBOARD_DATA_SUCCESS = "GET_REQUESTED_STUDENT_DASHBOARD_DATA_SUCCESS",
}

// i think we should make separate reducers to separate the different states if that makes sense
export interface State {
  signedIn: boolean;
  signInError?: Error;
  createUserError?: Error;
}

// i think we should make separate actions as well
export interface Action {
  type: ActionTypes;
  payload?: any; // eh
}

/**
 * Represents parameters needed to login.
 */
export interface LoginParams {
  email: string;
  password: string;
}

export interface CreateUserParams {
  email: string;
  password: string;
  name: string;
  accountType: AccountType;
  age: Number | null;
}

export interface ResetPasswordParams {
  email: string;
}

export interface SessionStats {
  userId: string;
  sessionId: number;
  interventionDuration: number;
  assessmentDuration: number;
  incorrectWords: number;
  correctWords: number;
}

export interface DashboardState {
  isSignedOut: boolean;
  user?: User;
  students?: User[];
  totalWordsLearned?: number;
  error?: Error;
  sessionStats?: SessionStats;
  currentStudent?: User;
  currentStudentTotalWordsLearned?: number;
}

export interface AssessmentResult {
  word: string;
  correct: boolean;
}

export type SessionId = -1 | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
