

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
  interventions: Intervention[];  // list of Intervention
  wordIdx: number;                // current word you're on
  activityIdx: number;            // current activity you're on
}

/**
 * Represents an intervention for a word, with four different activities.
 */
export interface Intervention {
  word: Word;
  activities: ActivityList;
}

export interface ActivityList {
  a1: Activity1;
  a2: Activity2;
  a3: Activity3;
  a4: Activity4;
}

/**
 * Activity 1 consists of oral prompts and an image.
 */
export interface Activity1 {
  prompt: string;
  url: string;
}

/**
 * Activity 2 consists of 2 images, and an oral prompt.
 */
export interface Activity2 {
  prompt: string;
  correctUrl: string;
  incorrectUrl: string;
}

/**
 * Activity 3 consists of an image, a prompt, and a correct answer.
 */
export interface Activity3 {
  prompt: string;
  url: string;
  answer: "yes" | "no";
}

/**
 * Activity 4 consists of an image and oral prompt.
 */
export interface Activity4 {
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
export type AccountType = "RESEARCHER" | "STUDENT"

// also these & all State/Action can def be moved to a separate file
/**
 * Represents types for redux Actions.
 */
export enum ActionTypes {
  REQUEST= "REQUEST",
  SUCCESS= "SUCCESS",
  ERROR = "ERROR",
  CREATE_USER = "CREATEUSER",
  SIGN_IN = "SIGNIN",
  AUTHENTICATION_SUCCESS = "AUTHENTICATIONSUCCESS",
  GET_WORDS = "GETWORDS",
  GET_WORDS_SUCCESS = "GETWORDSSUCCESS",
  GET_WORDS_REQUEST= "GET_WORDS_REQUEST",
  GET_WORDS_ERROR = "GET_WORDS_SUCCESS",
  RESET_PASSWORD = "RESETPASSWORD",
  RESET_PASSWORD_SUCCESS = "RESETPASSWORDSUCCESS",
  GET_INTERVENTIONS_REQUEST = "GET_INTERVENTIONS_REQUEST",
  GET_INTERVENTIONS_ERROR = "GET_INTERVENTIONS_ERROR",
  GET_INTERVENTIONS_SUCCESS = "GET_INTERVENTIONS_SUCCESS",
};


// i think we should make separate reducers to separate the different states if that makes sense
export interface State {
  signedIn : boolean;
  words : Word[] | null;
}

export interface AssessmentState {
  words: Word[] | null;
}

export interface InterventionState {
  currentWordIdx: number;
  currentActivityIdx: number;
  interventions: Interventions | null;
}

// i think we should make separate actions as well
export interface Action {
  type : ActionTypes;
  payload? : any; // eh
}

/**
 * Represents parameters needed to login.
 */
export interface LoginParams {
  email : string;
  password : string;
}

export interface CreateUserParams {
  email: string;
  password : string;
  name: string;
  accountType: AccountType;
  age: Number | null;
}

export interface ResetPasswordParams {
  email: string;
}