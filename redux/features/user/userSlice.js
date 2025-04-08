import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getUserInfo = createAsyncThunk(
  "user/getUserInfo",
  async (params, { dispatch }) => {
    const userInfoResponse = await fetch(`/api/user/${params.id}`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const userInfo = await userInfoResponse.json();
    if (userInfo.status) {
      dispatch(setUser(userInfo.data));
    } else {
      dispatch(setLoggedIn(false));
    }
  }
);

const initialState = {
  loggedIn: false,
  user: {
    name: "",
    email: "",
    picture: "",
    roleId: "1",
  },
};
const reducers = {
  setUser: (state, action) => {
    state.user = action.payload;
    state.loggedIn = true;
  },
  setLoggedIn: (state, action) => {
    state.loggedIn = action.payload;
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers,
});

export const { setUser, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;
