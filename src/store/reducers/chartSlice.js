import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'chart',
  initialState: {
    searchResult: {},
    searchPending: false,
    searchStatus: 'none',
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
    },
  },
});

const { updateSearchResult, switchPenging, setSearchStatus } = slice.actions;

const APIKey = 'f89b35f3f735ea1c3e009a36f1f3b7cf';

const convertResponse = (data) => {
  const ret = {
    city: data.city.name,
    country: data.city.country,
    chartData: [],
  };
  data.list.forEach((el) => {
    const date = new Date(el.dt_txt);
    ret.chartData.push({
      time: el.dt_txt.slice(-8, -3),
      date: date.toLocaleString('en-us', { month: 'short', day: 'numeric' }),
      temp: Math.round(el.main.temp),
    });
  });
  return ret;
};

const getWeatherAsync = async (city, dispatch) => {
  try {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${APIKey}`, {
      method: 'POST',
    });
    if (response.ok) {
      dispatch(setSearchStatus('ok'));
      const json = await response.json();
      const searchData = convertResponse(json);
      dispatch(updateSearchResult(searchData));
    } else {
      dispatch(setSearchStatus('error'));
    }
    dispatch(switchPenging(false));
  } catch (error) {
    dispatch(setSearchStatus('error'));
    dispatch(switchPenging(false));
  }
};

export const searchWeather = (city) => (dispatch) => {
  dispatch(switchPenging(true));
  getWeatherAsync(city, dispatch);
};

export const selectWeather = (state) => state.chart.searchResult;
export const selectStatus = (state) => state.chart.searchStatus;
export const selectPending = (state) => state.chart.searchPending;

export default slice.reducer;
