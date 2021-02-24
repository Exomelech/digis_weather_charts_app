import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'weather',
  initialState: {
    searchResult: {},
    searchPending: false,
    searchStatus: 'none'
  },
  reducers: {
    updateSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    switchPenging: (state, action) => {
      state.searchPending = action.payload;
    },
    setSearchStatus: (state, action) => {
      state.searchStatus = action.payload;
    }
  },
});

const { updateSearchResult, switchPenging, setSearchStatus } = slice.actions;

const APIKey = "f89b35f3f735ea1c3e009a36f1f3b7cf";

const convertResponse = data => {
  let ret = {
    city: data.city.name,
    country: data.city.country,
    chartData: []
  };
  data.list.map( el => 
    ret.chartData.push({
      time: el.dt_txt.slice(-8, -3),
      date: el.dt_txt.slice(5, 10),
      temp: Math.round(el.main.temp)
    })
  );
  return ret;
};

const getWeatherAsync = async (city, dispatch) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`, {
      method: 'POST'
    });
    if( response.ok ){
      dispatch(setSearchStatus('ok'));
      const json = await response.json();
      const searchData = convertResponse(json);
      console.log(searchData);
      dispatch(updateSearchResult(searchData));
    }else{
      dispatch(setSearchStatus('error'));
    };
    dispatch(switchPenging(false));
  } catch (error) {
    dispatch(setSearchStatus('error'));
    dispatch(switchPenging(false));
  };
};

export const searchWeather = city => dispatch => {
  dispatch(switchPenging(true));
  getWeatherAsync(city, dispatch);
};

export const selectWeather = state => state.weather.searchResult;
export const selectStatus = state => state.weather.searchStatus;
export const selectPending = state => state.weather.searchPending;

export default slice.reducer;