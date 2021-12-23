import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchTimers } from './timersAPI';

const initialState = {
  list: [],
};

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const fecthAsyncTimers = createAsyncThunk(
  'timers/fetchTimers',
  async () => {
    const response = await fetchTimers();
    // The value we return becomes the `fulfilled` action payload
    return response.data;
  }
);

const saveInSessionStorage = (timers) => sessionStorage.timers = JSON.stringify(timers)

export const timersSlice = createSlice({
  name: 'timers',
  initialState,
  reducers: {
    setTitle: (state, { payload: { id, value } }) => {
      state.list[id].title = value
      saveInSessionStorage(state.list)
    },
    setProject: (state, { payload: { id, value } }) => {
      state.list[id].project = value
      saveInSessionStorage(state.list)
    },
    editTimer: (state, { payload: { id } }) => {
      state.list[id].editMode = true
      saveInSessionStorage(state.list)
    },
    saveTimer: (state, { payload: { id } }) => {
      state.list[id].editMode = false
      saveInSessionStorage(state.list)
    },
    toggleStop: (state, { payload: { id } }) => {
      if (state.list[id].stopTime) {
        state.list[id].stopTime = null
        state.list[id].startTime = new Date()
      } else {
        state.list[id].stopTime = new Date()
      }
      saveInSessionStorage(state.list)
    },
    addTimer: (state) => {
      state.list.push({ 
        id: state.list.length, 
        editMode: false ,
        startTime: new Date(), 
        stopTime: null, 
        project: "", 
        title: "",
      })
      saveInSessionStorage(state.list)
    },
    removeTimer: (state, { payload: { id } }) => {
      state.list.splice(id, 1)
      saveInSessionStorage(state.list)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fecthAsyncTimers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fecthAsyncTimers.fulfilled, (state, action) => {
        state.status = 'ready';
        state.list = action.payload
      });
  },
});

export const { setTitle, setProject, addTimer, editTimer, saveTimer, removeTimer, toggleStop } = timersSlice.actions;

export default timersSlice.reducer;
