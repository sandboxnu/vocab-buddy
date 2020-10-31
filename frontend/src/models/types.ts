/**
 * Represents an assessment
 */
export interface Assessment {
  id: number;
  words: Word[];
  currentIndex: number;
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
