import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchWeather, selectPending, selectStatus } from '../store/reducers/weatherSlice';
import './Search.css';

export const Search = () => {

  const pending = useSelector( selectPending );
  const status = useSelector( selectStatus );
  const dispatch = useDispatch();
  const [searchInput, setSearchInput] = useState('');

  const onInputChange = e => {
    setSearchInput(e.target.value);
  };

  const onSubmit = () => {
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
      { status === 'error' 
        ? 
        <div className="search-box__error">No city was found, try again</div>
        : <></>
      }
    </div>
  );

};