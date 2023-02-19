import React, { useState } from 'react';
import axios from 'axios'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';


function SearchResults() {
  const [data, setData] = useState({});
  const [count, setCount] = useState(0);
  const [location, setLocation] = useState(''); 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const searchLocation = () => {
    setLoading(true);
    setError(null);
    const url = `http://api.weatherapi.com/v1/current.json?key=8cc2758af06a4d7aa7b55912231202&q=${location}&aqi=no`;
      
    axios.get(url)
      .then(response => {
        setData(response.data);
        setLoading(false);
        setCount(Object.keys(response.data).length);
      })
      .catch(error => {
        console.error(error);
        setLoading(false);
        setError('An error occurred while fetching weather data');
      });

  }

  let resultCount;
    if (Object.keys(data).length === 0) {
      resultCount = "Loading...";
    } else if (error) {
      resultCount = "An error occurred.";
    } else if (loading.length === 0) {
      resultCount = "No results found.";
    } else {
      resultCount = `Showing ${count.length} results.`;
    }


  return (
    
    <div className="bg-style">
      <h1>Weather Search App</h1>
      <div className="search-area">
        <input
          type="text"
          className='primary-input'
          placeholder="Search for a city"
          value={location}
          onChange={event => setLocation(event.target.value)}
          onKeyPress={event => {
            if (event.key === 'Enter') {
              searchLocation();
            }
          }}
        />
        <button onClick={searchLocation} className="btn btn-primary">
          <FontAwesomeIcon icon={faSearch} />
        </button>
      </div>
    
      {/* Filtering option checkbox */}
      <div className="filter-section">
        <h2>Filter By:-</h2>
        <div className="form-check">
          <input
              className="form-check-input"
              type="checkbox"
              name="filter"
              value="temperature"
          />
          <label 
              className="form-check-label" 
              htmlFor="defaultCheck1">
              City
          </label>
        </div>
        <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                name="filter"
                value="temperature"
            />
            <label 
                className="form-check-label" 
                htmlFor="defaultCheck1">
                Temperature
            </label>
          </div>
          <div className="form-check">
            <input
                className="form-check-input"
                type="checkbox"
                name="filter"
                value="humidity"
            />
            <label 
                className="form-check-label">
                Humidity
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="filter"
              value="wind_speed"
            />
            <label 
              className="form-check-label" 
              htmlFor="defaultCheck3">
              Wind Speed
            </label>
          </div>
      </div>

      <div className='results-container'>
          <h2>Results:-</h2>
          <div className="city">
            <p>{data.location?.name || ''}</p>
          </div>
          <div className="temp">
            <p>{data.current?.temp_c || 0}°c</p>
          </div>
          <div className="humidity">
            <p>{data.current?.humidity || 0}%</p>
          </div>
          <div className="wind-speed">
            <p>{data.current?.wind_kph || 0}km/h</p>
          </div>
      </div>
          {loading && <div className="loading">Loading...
      </div>}
          {error && <div className="error">{error}</div>}
      <div className='loading-message'>
          <p>{resultCount}</p>
          {/* Display the results */}
      </div>
      
    </div>
  
)}

export default SearchResults;