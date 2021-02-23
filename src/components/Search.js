import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchWeather } from '../store/reducers/weatherSlice';
import { SearchResult } from './SearchResult';
import './Search.css';

export const Search = () => {

  const pending = useSelector( state => state.weather.searchPending );
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const onInputChange = e => {
    setSearchInput(e.target.value);
  };

  const onSubmit = () => {
    //console.log(pending)
    if( !pending ){
      dispatch( searchWeather(searchInput) );
    };
  };

  return(
    <div className="search-box">
      <div className="search-box__title">Weather forecast app</div>
      <div className="search-box__input-container">
        <input
          className="search-box__input"
          value={searchInput}
          onChange={onInputChange}
          placeholder="City"
          onSubmit={onSubmit}/>
        <button
          className="search-box__button"
          onClick={onSubmit}>
          search
        </button>
      </div>
      {/* <SearchResult /> */}
    </div>
  );

};