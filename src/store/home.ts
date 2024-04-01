import { createSlice } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import BASE_URL from "../config/host";

export const homeSlice = createSlice({
  name: "homeData",
  initialState: {
    loading: false,
    homeData: [],
  },
  reducers: {
    Requested: (state, action) => {
      
      state.loading = true;
    },
    Failed: (state, action) => {
      state.loading = false;
    },
    Received: (state, action) => {
      state.loading = false;
      //console.log(action.payload.products)
      state.homeData = action.payload.products;
    },
  },
});

export const { Received, Requested, Failed } = homeSlice.actions;
//console.log(body);

export const fetchHomeData = () =>
  apiCallBegan({
    url: "/products",
    method: "get",
    data: {},
    baseUrl: BASE_URL,
    onSuccess: 'homeData/Received',
    onStart: 'homeData/Requested',
    onError: 'homeData/Failed',
  });
