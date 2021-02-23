import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'weather',
  initialState: {
    searchResult: {},
    searchPending: false
  },
  reducers: {
    updateSearchResult: (state, action) => {
      //state.value += 1;
    },
    switchPenging: (state, action) => {
      //let newState = action.payload || !state.searchPending;
      state.searchPending = action.payload;
    }
  },
});

const { updateSearchResult, switchPenging } = slice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched

//api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}

const APIKey = "f89b35f3f735ea1c3e009a36f1f3b7cf";

const getWeatherAsync = async (city, dispatch) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${APIKey}`, {
      method: 'POST'
    });
    if( response.status === 200 ){
      const json = await response.json();
      console.log( json );
    }else{
      //console.log( response );
    };
    dispatch(switchPenging(false));
  } catch (error) {
    console.warn(`getWeatherAsync error: ${error}`);
  };
};

export const searchWeather = city => dispatch => {
  dispatch(switchPenging(true));
  console.log( city, 'searchWeather' );
  getWeatherAsync(city, dispatch);
  //setTimeout(() => {
  //  dispatch(switchPenging(false));
  //}, 10000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectWeather = state => state.weather.searchResult;

export default slice.reducer;