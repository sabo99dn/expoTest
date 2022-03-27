import { createSelector } from "reselect";
export const reducer = (state) => state.auth;
export const accountTemp = createSelector(
  reducer,
  (data) => data.accountTemp || null
);
export const login = createSelector(
  reducer,
  (data) => data.login || null
);
export const authLoadingSelector = createSelector(
  reducer,
  (data) => data.loading || false
);

export const loginStatusSelector = createSelector(
  reducer,
  (data) => data.loginSuccess || false
);

export const signUpStatus = createSelector(
  reducer,
  (data) => data.signUpSuccess || false
);

export const errorSelector = createSelector(
  reducer,
  (data) => data.error || ""
);

export const errorSignUpSelector = createSelector(
  reducer,
  (data) => data.errorSignUp || ""
);