import { createSelector } from "@reduxjs/toolkit";

export const miscSliceSelector = (store) => store.misc;

export const miscItemsSelector = createSelector(
  miscSliceSelector,
  (miscSlice) => miscSlice.items,
  // all. list, error, isFetching, ...pagination params
);
export const miscItemsListSelector = createSelector(
  miscItemsSelector,
  (miscSlice) => miscSlice.list,
  // list
);
export const miscItemsIsFetchingSelector = createSelector(
  miscItemsSelector,
  (miscSlice) => miscSlice.isFetching,
  // isFetching
);
export const miscItemsErrorSelector = createSelector(
  miscItemsSelector,
  (miscSlice) => miscSlice.error,
  // error
);

export const selectedMiscItemSelector = createSelector(
  miscSliceSelector,
  (miscSlice) => miscSlice.selectedMiscItem,
);
export const selectedMiscItemIsFetchingSelector = createSelector(
  miscSliceSelector,
  (miscSlice) => miscSlice.selectedMiscItemIsFetching,
);
export const selectedMiscItemErrorSelector = createSelector(
  miscSliceSelector,
  (miscSlice) => miscSlice.selectedMiscItemError,
);
