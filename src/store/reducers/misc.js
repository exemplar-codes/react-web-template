import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import to from "await-to-js";
const miscInitialState = {
  items: {
    list: [],
    isFetching: false,
    error: null,
    //
    hasMore: true,
    page: 1,
    limit: 20,
    total: 0,
    //
  },

  selectedMiscItem: null,
  selectedMiscItemIsFetching: false,
  selectedMiscItemError: null,
};

const miscSlice = createSlice({
  name: "misc",
  initialState: miscInitialState,
  reducers: {
    resetMisc: () => miscInitialState,
    // listing
    resetMiscItems(state) {
      state.items = miscInitialState.items;
    },
    setMiscItems(state, action) {
      // direct or first page download op
      state.items.list = action.payload;
    },
    appendToMiscItems(state, action) {
      // for get more pages ops
      state.items.list = state.items.concat(action.payload);
    },
    prependToMiscItems(state, action) {
      // for create ops
      const listOrObj = action.payload;
      state.items.list = [
        ...(Array.isArray(listOrObj) ? listOrObj : [listOrObj]),
        ...state.items.list,
      ];
    },
    removeMiscItems(state, action) {
      // for delete ops
      const ids = Array.isArray(action.payload)
        ? action.payload
        : [action.payload];

      state.items.list = state.items.list.filter(
        (item) => !ids.includes(item.id),
      );
    },
    setMiscItemsIsFetching(state, action) {
      state.items.isFetching = action.payload;
    },
    setMiscItemsError(state, action) {
      state.items.error = action.payload;
    },
    setMiscItemsPaginationParams(state, action) {
      state.items.hasMore = action.payload.hasMore ?? state.items.hasMore;
      state.items.page = action.payload.page ?? state.items.page;
      state.items.limit = action.payload.limit ?? state.items.limit;
      state.items.total = action.payload.total ?? state.items.total;
    },
    // select item
    setSelectedMiscItem(state, action) {
      state.selectedMiscItem = action.payload;
    },
    setSelectedMiscItemIsFetching(state, action) {
      state.selectedMiscItemIsFetching = action.payload;
    },
    setSelectedMiscItemError(state, action) {
      state.selectedMiscItemError = action.payload;
    },
  },
});

export const fetchMiscItems = createAsyncThunk(
  "misc/fetchMiscItems",
  async (params, { dispatch }) => {
    dispatch(setMiscItemsIsFetching(true));

    const [err, resp] = await to(
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${params?.page}&_limit=${params?.limit}`,
      ),
    );

    if (!err) {
      const data = await resp.json();
      // if (params?.page === 1) dispatch(setMiscItemsPaginationParams(data));
      dispatch(appendToMiscItems(data));
    } else {
      setMiscItemsError(err);
    }

    dispatch(setMiscItemsIsFetching(false));
  },
);

export const fetchAndSelectMiscItem = createAsyncThunk(
  "misc/fetchMiscItems",
  async (params, { dispatch }) => {
    dispatch(setSelectedMiscItemIsFetching(true));

    const [err, resp] = await to(
      fetch(
        `https://jsonplaceholder.typicode.com/posts?_page=${params?.page}&_limit=${params?.limit}`,
      ),
    );

    if (!err) {
      const data = await resp.json();
      dispatch(setSelectedMiscItem(data));
    } else {
      setSelectedMiscItemError(err);
    }

    dispatch(setSelectedMiscItemIsFetching(false));
  },
);

export const {
  setMiscData,
  resetMisc,
  resetMiscItems,
  setMiscItems,
  appendToMiscItems,
  prependToMiscItems,
  setMiscItemsIsFetching,
  setMiscItemsError,
  removeMiscItems,
  setMiscItemsPaginationParams,
  setSelectedMiscItem,
  setSelectedMiscItemIsFetching,
  setSelectedMiscItemError,
} = miscSlice.actions;

export default miscSlice.reducer;
