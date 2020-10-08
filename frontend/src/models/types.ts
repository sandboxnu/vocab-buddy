// bad?
import Word from "./Word";



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
};


// i think we should make separate reducers to separate the different states if that makes sense
export interface State {
  signedIn : boolean;
  words : WordList | null;
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

// i dont really like this
// i think we should convert Word from a class to one of these types
export interface WordList {
  words: Word[];
}
