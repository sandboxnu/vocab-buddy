/**
 * Represents an assessment
 */
export interface Assessment {
  id: number;
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
  CREATE_USER = "CREATEUSER",
  SIGN_IN = "SIGNIN",
  AUTHENTICATION_SUCCESS = "AUTHENTICATIONSUCCESS",
  GET_WORDS = "GETWORDS",
  GET_ASSESSMENT_SUCCESS = "GET_ASSESSMENT_SUCCESS",
  GET_ASSESSMENT_REQUEST = "GET_ASSESSMENT_REQUEST",
  GET_ASSESSMENT_ERROR = "GET_ASSESSMENT_ERROR",
  RESET_PASSWORD = "RESETPASSWORD",
  RESET_PASSWORD_SUCCESS = "RESETPASSWORDSUCCESS",
  GET_INTERVENTIONS_REQUEST = "GET_INTERVENTIONS_REQUEST",
  GET_INTERVENTIONS_ERROR = "GET_INTERVENTIONS_ERROR",
  GET_INTERVENTIONS_SUCCESS = "GET_INTERVENTIONS_SUCCESS",
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
}

// i think we should make separate reducers to separate the different states if that makes sense
export interface State {
  signedIn: boolean;
  words: Word[] | null;
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

export interface DashboardState {
  isSignedOut: boolean;
}

export interface AssessmentResult {
  word: string;
  correct: boolean;
}
