/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserList
// ====================================================

export interface GetUserList_user {
  __typename: "user";
  name: string | null;
  email: string | null;
  password: string;
}

export interface GetUserList {
  /**
   * fetch data from the table: "user"
   */
  user: GetUserList_user[];
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetUserPassword
// ====================================================

export interface GetUserPassword_user {
  __typename: "user";
  password: string;
}

export interface GetUserPassword {
  /**
   * fetch data from the table: "user"
   */
  user: GetUserPassword_user[];
}

export interface GetUserPasswordVariables {
  user_name?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
