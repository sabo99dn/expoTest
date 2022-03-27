import { createSelector } from "reselect";
export const reducer = (state) => state.home;
export const listArticleSelector = createSelector(
  reducer,
  (data) => data.listArticle || []
);
export const homeLoadingSelector = createSelector(
  reducer,
  (data) => data.loading || false
);
export const loginInWeb = createSelector(
  reducer,
  (data) => data.loginInWeb || false
);
export const webUrl = createSelector(
  reducer,
  (data) => data.tempWebUrl || ''
);
export const splash = createSelector(
  reducer,
  (data) => data.splash ||false
);
export const backToLogin = createSelector(
  reducer,
  (data) => data.backToLogin ||false
);

